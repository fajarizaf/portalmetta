export type ChargeCategory = "ONE_TIME" | "RECURRING";
export type RecurrenceInterval = "MONTHLY" | "QUARTERLY" | "ANNUALLY" | "ONE_TIME";

export interface ChargeTypeDefinition {
  code: string;
  name: string;
  category: ChargeCategory;
  defaultInterval: RecurrenceInterval;
  isSingleInvoiceOnly: boolean; // True for NRC/Setup fees that can only be invoiced once
  description: string;
}

export class ChargeTypeRegistry {
  private static registry: Map<string, ChargeTypeDefinition> = new Map([
    [
      "NRC",
      {
        code: "NRC",
        name: "Non-Recurring Charge",
        category: "ONE_TIME",
        defaultInterval: "ONE_TIME",
        isSingleInvoiceOnly: true,
        description: "Biaya satu kali bayar (Setup/Instalasi)",
      },
    ],
    [
      "MRC",
      {
        code: "MRC",
        name: "Monthly Recurring Charge",
        category: "RECURRING",
        defaultInterval: "MONTHLY",
        isSingleInvoiceOnly: false,
        description: "Biaya berlangganan bulanan rutin",
      },
    ],
    [
      "SETUP_FEE",
      {
        code: "SETUP_FEE",
        name: "Setup Fee",
        category: "ONE_TIME",
        defaultInterval: "ONE_TIME",
        isSingleInvoiceOnly: true,
        description: "Biaya konfigurasi & setup awal",
      },
    ],
    [
      "ACTIVATION_FEE",
      {
        code: "ACTIVATION_FEE",
        name: "Activation Fee",
        category: "ONE_TIME",
        defaultInterval: "ONE_TIME",
        isSingleInvoiceOnly: true,
        description: "Biaya aktivasi layanan",
      },
    ],
    [
      "MAINTENANCE_FEE",
      {
        code: "MAINTENANCE_FEE",
        name: "Maintenance Fee",
        category: "RECURRING",
        defaultInterval: "MONTHLY",
        isSingleInvoiceOnly: false,
        description: "Biaya pemeliharaan rutin",
      },
    ],
    [
      "QUARTERLY_FEE",
      {
        code: "QUARTERLY_FEE",
        name: "Quarterly Fee",
        category: "RECURRING",
        defaultInterval: "QUARTERLY",
        isSingleInvoiceOnly: false,
        description: "Biaya per kuartal (3 bulan)",
      },
    ],
    [
      "ANNUAL_FEE",
      {
        code: "ANNUAL_FEE",
        name: "Annual Fee",
        category: "RECURRING",
        defaultInterval: "ANNUALLY",
        isSingleInvoiceOnly: false,
        description: "Biaya tahunan rutin",
      },
    ],
  ]);

  public static register(def: ChargeTypeDefinition): void {
    this.registry.set(def.code.toUpperCase(), def);
  }

  public static get(code: string): ChargeTypeDefinition {
    const key = code.toUpperCase();
    if (this.registry.has(key)) {
      return this.registry.get(key)!;
    }
    return {
      code: key,
      name: code,
      category: key.includes("ONE") || key.includes("SETUP") || key.includes("NRC") ? "ONE_TIME" : "RECURRING",
      defaultInterval: "MONTHLY",
      isSingleInvoiceOnly: key.includes("ONE") || key.includes("SETUP") || key.includes("NRC"),
      description: `Custom charge type: ${code}`,
    };
  }

  public static listAll(): ChargeTypeDefinition[] {
    return Array.from(this.registry.values());
  }
}
