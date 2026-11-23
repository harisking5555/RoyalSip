/**
 * Pure client-side PDF 1.4 generator for RoyalSip Beverages Official Company Profile.
 * Produces a valid downloadable PDF document without external server dependencies.
 */

function escapePdfText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

export function downloadCompanyProfilePdf(): void {
  const lines: { text: string; size: number; bold?: boolean; gap: number }[] = [
    { text: 'ROYALSIP BEVERAGES', size: 22, bold: true, gap: 28 },
    { text: 'Turn Water Into Your Brand - Official Company Profile', size: 12, bold: false, gap: 24 },
    { text: '--------------------------------------------------------------------', size: 10, gap: 18 },
    { text: '1. COMPANY INTRODUCTION & BACKGROUND', size: 13, bold: true, gap: 18 },
    { text: 'RoyalSip Beverages (royalsipbeverages.pk) is a Lahore-based custom', size: 10, gap: 14 },
    { text: 'beverage & private-label hydration specialist serving weddings,', size: 10, gap: 14 },
    { text: 'marriage halls, corporate enterprises, restaurants, and households.', size: 10, gap: 22 },
    { text: '2. MISSION & VISION', size: 13, bold: true, gap: 18 },
    { text: 'Mission: Deliver pure mineral water and refreshing RoyalSip fruit', size: 10, gap: 14 },
    { text: 'juices with bespoke custom branding, fast mock-ups, and punctual drops.', size: 10, gap: 14 },
    { text: 'Vision: Become Pakistan\'s trusted benchmark for personalised event', size: 10, gap: 14 },
    { text: 'and corporate beverage hospitality.', size: 10, gap: 22 },
    { text: '3. PRODUCTS & SERVICES', size: 13, bold: true, gap: 18 },
    { text: '- Custom-Label Mineral Water (500ml & 1.5L PET Bottles)', size: 10, gap: 14 },
    { text: '- Packages: Basic (PKR 80-100), Standard (PKR 120-150),', size: 10, gap: 14 },
    { text: '  and Premium Luxury Gold-Foil Edition (PKR 180-250)', size: 10, gap: 14 },
    { text: '- RoyalSip Fruit Juices & Flavoured Water (Mango, Kinnow,', size: 10, gap: 14 },
    { text: '  Apple, Pink Guava, Lemon-Mint & Rose Peach Water)', size: 10, gap: 22 },
    { text: '4. B2B & B2C BUSINESS OPERATIONS', size: 13, bold: true, gap: 18 },
    { text: '- B2B: Marquees, Shadi Halls, Event Planners (10% Partner Rate),', size: 10, gap: 14 },
    { text: '  Corporate Offices, and Restaurant Monthly Table Supply Plans.', size: 10, gap: 14 },
    { text: '- B2C: Direct E-Commerce Shop (Cash on Delivery), Personalised', size: 10, gap: 14 },
    { text: '  Parties (from 50 bottles), and Home Hydration Packs.', size: 10, gap: 22 },
    { text: '5. CONTACT & KEY BUSINESS INFORMATION', size: 13, bold: true, gap: 18 },
    { text: 'Website: https://royalsipbeverages.pk', size: 10, gap: 14 },
    { text: 'Official Email: info@royalsipbeverages.pk', size: 10, gap: 14 },
    { text: 'WhatsApp / Direct: +92-321-455-1473 (0321-4551473)', size: 10, gap: 14 },
    { text: 'Service Area: Lahore (DHA, Gulberg, Model Town, Bahria Town & Halls)', size: 10, gap: 14 },
  ];

  let y = 760;
  const streamOps: string[] = ['BT'];
  for (const line of lines) {
    const fontKey = line.bold ? '/F2' : '/F1';
    streamOps.push(`${fontKey} ${line.size} Tf`);
    streamOps.push(`1 0 0 1 54 ${y} Tm`);
    streamOps.push(`(${escapePdfText(line.text)}) Tj`);
    y -= line.gap;
  }
  streamOps.push('ET');
  const contentStream = streamOps.join('\n');

  const objects: string[] = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  objects.push(
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n'
  );
  objects.push(
    `4 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`
  );
  objects.push(
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'
  );
  objects.push(
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n'
  );

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'RoyalSip-Beverages-Company-Profile.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
