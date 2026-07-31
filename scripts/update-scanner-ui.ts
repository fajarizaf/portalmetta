import * as fs from "fs";
import * as path from "path";

function updateScannerUI() {
  const filePath = path.join(process.cwd(), "src/app/admin/visits/scanner/page.tsx");
  let file = fs.readFileSync(filePath, "utf-8");

  // Add Access Card badge
  const validBadgeRegex = /<CheckCircle2 className="w-3\.5 h-3\.5" \/> Valid\n\s+<\/span>\n\s+\) : \(/;
  file = file.replace(validBadgeRegex, (match) => 
    `<CheckCircle2 className="w-3.5 h-3.5" /> Valid
                      </span>
                      {scanResult.isAccessCard && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium ring-1 ring-inset ring-blue-600/20 ml-2">
                          <QrCode className="w-3.5 h-3.5" /> Access Card
                        </span>
                      )}
                    ) : (`
  );

  // Update Scheduled Date
  const visitDateRegex = /<p className="text-sm font-medium text-slate-700">\{String\(rec\.data\["visit_date"\] \|\| "-"\)\}<\/p>/;
  file = file.replace(visitDateRegex, 
    `<p className="text-sm font-medium text-slate-700">{scanResult.isAccessCard ? "Permanent" : String(rec.data["visit_date"] || "-")}</p>`
  );

  // Update Check-in Button logic
  const checkInBtnRegex = /\{rec\.qrStatus !== "checked_in" && rec\.qrStatus !== "checked_out" && \(/;
  file = file.replace(checkInBtnRegex, 
    `{(rec.qrStatus !== "checked_in" && (rec.qrStatus !== "checked_out" || scanResult.isAccessCard)) && (`
  );

  // Update Visit Completed logic
  const visitCompletedRegex = /\{rec\.qrStatus === "checked_out" && \(\n\s+<div className="flex items-center justify-center h-10 px-6 rounded-md bg-slate-50 text-slate-500 font-medium text-sm border border-slate-200 w-full sm:w-auto">\n\s+Visit Completed\n\s+<\/div>\n\s+\)\}/;
  file = file.replace(visitCompletedRegex, 
    `{(rec.qrStatus === "checked_out" && !scanResult.isAccessCard) && (
                      <div className="flex items-center justify-center h-10 px-6 rounded-md bg-slate-50 text-slate-500 font-medium text-sm border border-slate-200 w-full sm:w-auto">
                        Visit Completed
                      </div>
                    )}`
  );

  fs.writeFileSync(filePath, file);
}

updateScannerUI();
