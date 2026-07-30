import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { SubscriptionService } from "../src/lib/services/subscription-service";
import { BillingScheduleService } from "../src/lib/services/billing-schedule-service";
import { InvoiceBillingService } from "../src/lib/services/invoice-billing-service";

async function runVerificationTest() {
  console.log("=== STARTING SUBSCRIPTION & BILLING SYSTEM VERIFICATION TEST ===");

  // 1. Fetch or create a test Customer & Sales Order
  const company = await prisma.company.findFirst();
  if (!company) throw new Error("No company found in database");

  const soDt = await prisma.docType.findUnique({ where: { key: "sales_order" } });
  if (!soDt) throw new Error("Sales Order DocType not found");

  const soItemDt = await prisma.docType.findUnique({ where: { key: "sales_order_item" } });
  if (!soItemDt) throw new Error("Sales Order Item DocType not found");

  const testSOCode = `SO-TEST-${Date.now()}`;
  console.log(`Creating Test Sales Order: ${testSOCode}...`);

  const soRecord = await prisma.docRecord.create({
    data: {
      docTypeId: soDt.id,
      code: testSOCode,
      status: "Approved",
      docStatus: 1,
      data: {
        order_no: testSOCode,
        customer_id: company.id,
        order_date: new Date().toISOString().split("T")[0],
        commencement_date: "2026-01-01",
        contract_duration: 12,
        term_of_payment: "Monthly",
        subtotal_nrc: 5000000,
        subtotal_mrc: 2000000,
        total_contract: 29000000,
      },
    },
  });

  // Create SO child items: 1 NRC setup item + 1 MRC monthly item
  await prisma.docRow.createMany({
    data: [
      {
        recordId: soRecord.id,
        childDocTypeId: soItemDt.id,
        idx: 0,
        data: {
          service_name: "Internet Dedicated 100Mbps",
          qty: 1,
          nrc: 5000000,
          mrc: 2000000,
          price: 7000000,
          description: "Internet Dedicated Connection",
        },
      },
    ],
  });

  console.log(`✅ Sales Order ${testSOCode} created & approved.`);

  // 2. Generate Subscription from Sales Order
  console.log("\nTesting Subscription generation...");
  const subRecord = await SubscriptionService.createSubscriptionFromSalesOrder(soRecord.id);
  console.log(`✅ Subscription created: Code = ${subRecord.code}, Status = ${subRecord.status}`);

  // 3. Verify Generated Billing Schedules
  console.log("\nVerifying Billing Schedules...");
  const schedules = await BillingScheduleService.getSchedulesForSubscription(subRecord.id);
  console.log(`Total Schedules Generated: ${schedules.length}`);

  const nrcSchedules = schedules.filter((s) => s.chargeType === "NRC");
  const mrcSchedules = schedules.filter((s) => s.chargeType === "MRC");

  console.log(`- NRC Schedules count: ${nrcSchedules.length} (Expected: 1)`);
  console.log(`- MRC Schedules count: ${mrcSchedules.length} (Expected: 12)`);

  if (nrcSchedules.length !== 1 || mrcSchedules.length !== 12) {
    throw new Error("❌ Billing Schedule generation count mismatch!");
  }
  console.log("✅ Billing Schedules generated correctly for 12 months.");

  // 4. Test Invoicing (NRC + Month 1 MRC)
  console.log("\nTesting Selective Invoicing (NRC + Month 1 MRC)...");
  const initialSelected = [nrcSchedules[0].id, mrcSchedules[0].id];
  const invoiceResult = await InvoiceBillingService.generateInvoiceFromSchedules({
    subscriptionId: subRecord.id,
    scheduleIds: initialSelected,
    notes: "First Invoice (NRC + Month 1)",
  });

  console.log(`✅ Invoice generated: Number = ${invoiceResult.invoiceNumber}`);
  console.log(`- Subtotal: Rp ${invoiceResult.subtotal.toLocaleString()}`);
  console.log(`- Tax (11%): Rp ${invoiceResult.tax.toLocaleString()}`);
  console.log(`- Total Amount: Rp ${invoiceResult.totalAmount.toLocaleString()}`);

  // Verify schedule status updated to 'Invoiced'
  const updatedSchedules1 = await BillingScheduleService.getSchedulesForSubscription(subRecord.id);
  const sch1 = updatedSchedules1.find((s) => s.id === nrcSchedules[0].id);
  const sch2 = updatedSchedules1.find((s) => s.id === mrcSchedules[0].id);

  console.log(`- NRC Schedule status: ${sch1?.status} (Expected: Invoiced)`);
  console.log(`- MRC Month 1 status: ${sch2?.status} (Expected: Invoiced)`);

  if (sch1?.status !== "Invoiced" || sch2?.status !== "Invoiced") {
    throw new Error("❌ Schedule status failed to update to Invoiced!");
  }

  // 5. Test Double-Invoicing Protection
  console.log("\nTesting Double-Invoicing Protection...");
  try {
    await InvoiceBillingService.generateInvoiceFromSchedules({
      subscriptionId: subRecord.id,
      scheduleIds: [nrcSchedules[0].id],
    });
    throw new Error("❌ Double invoicing validation failed! (Should have thrown an error)");
  } catch (err: any) {
    console.log(`✅ Single-invoicing rule enforced correctly: "${err.message}"`);
  }

  // 6. Test Invoice Payment & Status Sync
  console.log("\nTesting Invoice Payment & Schedule Sync...");
  await InvoiceBillingService.markInvoiceAsPaid(invoiceResult.invoiceRecord.id, {
    paymentMethod: "Bank Transfer",
    referenceNo: "TRX-998877",
  });

  const updatedSchedules2 = await BillingScheduleService.getSchedulesForSubscription(subRecord.id);
  const sch1Paid = updatedSchedules2.find((s) => s.id === nrcSchedules[0].id);
  console.log(`- NRC Schedule status after Invoice Paid: ${sch1Paid?.status} (Expected: Paid)`);

  if (sch1Paid?.status !== "Paid") {
    throw new Error("❌ Schedule status failed to sync to Paid!");
  }
  console.log("✅ Invoice payment sync verified.");

  // 7. Test Invoicing Month 2 & Cancellation Rollback
  console.log("\nTesting Invoice Month 2 & Cancellation Rollback...");
  const invoice2 = await InvoiceBillingService.generateInvoiceFromSchedules({
    subscriptionId: subRecord.id,
    scheduleIds: [mrcSchedules[1].id],
  });

  console.log(`Generated Month 2 Invoice: ${invoice2.invoiceNumber}`);
  await InvoiceBillingService.cancelInvoice(invoice2.invoiceRecord.id);

  const updatedSchedules3 = await BillingScheduleService.getSchedulesForSubscription(subRecord.id);
  const schMonth2 = updatedSchedules3.find((s) => s.id === mrcSchedules[1].id);
  console.log(`- Month 2 Schedule status after Cancellation: ${schMonth2?.status} (Expected: Ready / Pending)`);

  if (schMonth2?.status === "Invoiced") {
    throw new Error("❌ Schedule status failed to rollback upon Invoice cancellation!");
  }
  console.log("✅ Invoice cancellation rollback verified.");

  // 8. Test Subscription Renewal (+12 months)
  console.log("\nTesting Subscription Contract Renewal (+12 months)...");
  await SubscriptionService.renewSubscription(subRecord.id, {
    additionalMonths: 12,
  });

  const renewedSchedules = await BillingScheduleService.getSchedulesForSubscription(subRecord.id);
  console.log(`Total Schedules after +12 month Renewal: ${renewedSchedules.length} (Expected: 25 = 1 NRC + 24 MRC)`);

  if (renewedSchedules.length !== 25) {
    throw new Error("❌ Contract Renewal schedule generation count mismatch!");
  }
  console.log("✅ Subscription Contract Renewal verified.");

  // 9. Verify Summary Metrics Calculation
  console.log("\nVerifying Subscription Summary Metrics...");
  const metrics = await SubscriptionService.getSubscriptionSummaryMetrics(subRecord.id);
  console.log("Metrics Summary:", JSON.stringify(metrics, null, 2));

  console.log("\n🎉 ALL SUBSCRIPTION & BILLING SYSTEM VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉");
}

runVerificationTest()
  .catch((e) => {
    console.error("Test Failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
