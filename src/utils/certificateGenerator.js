import jsPDF from 'jspdf';

export const generateCertificate = async (username, flags) => {
  // Filter gevonden flags
  const foundFlags = flags.filter(flag => flag.found);
  const totalFlags = flags.length;
  const foundCount = foundFlags.length;
  const percentage = Math.round((foundCount / totalFlags) * 100);

  // Niveau bepalen
  const getLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Cyber Expert', color: [220, 38, 38] };
    if (percentage >= 70) return { level: 'Cyber Warrior', color: [234, 88, 12] };
    if (percentage >= 50) return { level: 'Cyber Scout', color: [202, 138, 4] };
    if (percentage >= 25) return { level: 'Cyber Novice', color: [5, 150, 105] };
    return { level: 'Cyber Beginner', color: [37, 99, 235] };
  };
  const levelInfo = getLevel(percentage);

  const pdf = new jsPDF('landscape', 'mm', 'a4');

  // --- Pagina 1: Certificaat ---
  // Achtergrond
  pdf.setFillColor(130, 100, 180); // Mooie paarse tint
  pdf.rect(0, 0, 297, 210, 'F');

  // Titel
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(38);
  pdf.setTextColor(255, 255, 255);
  pdf.text('Cyberbrein Certificaat', 148.5, 45, { align: 'center' });

  // Subtitel
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(18);
  pdf.text('Cybersecurity Achievement Award', 148.5, 60, { align: 'center' });

  // Naam
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(15);
  pdf.text('Dit certificaat wordt uitgereikt aan:', 148.5, 80, { align: 'center' });
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(28);
  pdf.text(username, 148.5, 98, { align: 'center' });

  // Niveau badge
  pdf.setDrawColor(...levelInfo.color);
  pdf.setFillColor(...levelInfo.color);
  pdf.roundedRect(108.5, 108, 80, 16, 6, 6, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(15);
  pdf.setTextColor(255,255,255);
  pdf.text(levelInfo.level, 148.5, 120, { align: 'center' });

  // Datum
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.setTextColor(255, 255, 255);
  pdf.text(`Uitgereikt op: ${new Date().toLocaleDateString('nl-NL')}`, 148.5, 132, { align: 'center' });

  // Voortgang
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('Jouw Voortgang', 148.5, 148, { align: 'center' });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(13);
  pdf.text(`${foundCount} van ${totalFlags} flags gevonden (${percentage}%)`, 148.5, 158, { align: 'center' });

  // Voortgangsbalk
  const barX = 98.5, barY = 165, barW = 100, barH = 10;
  pdf.setDrawColor(255,255,255);
  pdf.setFillColor(230,230,250);
  pdf.roundedRect(barX, barY, barW, barH, 3, 3, 'FD');
  pdf.setFillColor(...levelInfo.color);
  pdf.roundedRect(barX, barY, barW * (percentage/100), barH, 3, 3, 'F');

  // Stichting Cyberbrein-blok
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(15);
  pdf.setTextColor(255,255,255);
  pdf.text('Over Stichting Cyberbrein', 148.5, 190, { align: 'center' });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.text(
    'Wij ondersteunen en begeleiden jonge cyberbreinen in hun ontwikkeling.',
    148.5, 198, { align: 'center', maxWidth: 250 });
  pdf.text('Bezoek ons op: cyberbrein.nl', 148.5, 205, { align: 'center' });

  // Certificaat ID
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(220,220,220);
  pdf.text(`Certificaat ID: ${Date.now().toString(36).toUpperCase()}`, 148.5, 210, { align: 'center' });

  // --- Pagina 2: Gevonden Flags ---
  pdf.addPage('a4', 'landscape');
  pdf.setFillColor(245, 240, 255);
  pdf.rect(0, 0, 297, 210, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(80, 40, 120);
  pdf.text('Jouw Gevonden Flags', 148.5, 25, { align: 'center' });

  if (foundFlags.length === 0) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14);
    pdf.setTextColor(80, 40, 120);
    pdf.text('Nog geen flags gevonden. Ga de uitdaging aan en verzamel je eerste flag!', 148.5, 50, { align: 'center' });
  } else {
    let y = 40;
    foundFlags.forEach((flag, i) => {
      if (y > 180) {
        pdf.addPage('a4', 'landscape');
        pdf.setFillColor(245, 240, 255);
        pdf.rect(0, 0, 297, 210, 'F');
        y = 20;
      }
      // Kaartje
      pdf.setDrawColor(180, 160, 220);
      pdf.setFillColor(255,255,255);
      pdf.roundedRect(20, y, 257, 22, 5, 5, 'FD');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.setTextColor(80, 40, 120);
      pdf.text(`${flag.flagName}`, 25, y+10);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);
      pdf.text(flag.description, 25, y+17);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(60, 180, 120);
      pdf.text(flag.value, 220, y+15);
      y += 28;
    });
  }

  // Download de PDF
  const filename = `cyberbrein-certificaat-${username}-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(filename);
}; 