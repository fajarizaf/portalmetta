import * as fs from "fs";

function run() {
  let file = fs.readFileSync("src/app/admin/companies/[id]/page.tsx", "utf-8");

  // Modify DocListCard props and View All link
  file = file.replace(
    /emptyMessage: string\n}\) \{/,
    `emptyMessage: string\n  filterParam?: string\n}) {`
  );
  
  file = file.replace(
    /<Link href=\{\`\/admin\/docs\/\$\{docTypeKey\}\`\}>/,
    `<Link href={\`/admin/docs/\${docTypeKey}\${filterParam ? \`?\${filterParam}\` : ''}\`}>`
  );

  // Modify docTabs.map to pass filterParam
  const docTabsMapRegex = /<DocListCard\s+key=\{key\}\s+docs=\{docsByKey\[key\] \|\| \[\]\}\s+docTypeKey=\{key\}\s+label=\{label\}\s+icon=\{icon\}\s+emptyMessage=\{\`No \$\{label\.toLowerCase\(\)\} history found\.\`\}\s+\/>/g;
  
  file = file.replace(docTabsMapRegex, `<DocListCard
                key={key}
                docs={docsByKey[key] || []}
                docTypeKey={key}
                label={label}
                icon={icon}
                emptyMessage={\`No \${label.toLowerCase()} history found.\`}
                filterParam={key === "visitor_request" ? \`owner_customer_id=\${company.id}\` : \`customer_id=\${company.id}\`}
              />`);
              
  fs.writeFileSync("src/app/admin/companies/[id]/page.tsx", file);
}

run();
