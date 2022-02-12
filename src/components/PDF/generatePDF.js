import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {AmiriFont} from './aracicFont'


export const addArabicPdf = (doc) => {
    doc.addFileToVFS("Amiri-Regular.ttf", AmiriFont);
    doc.addFont("Amiri-Regular.ttf", "amiri", "normal");
    doc.setFont("amiri");
  };

export function downloadPDF(data,tableBody,jsAutoTableOptions = { styles: {} } ) {
    const doc = new jsPDF()
    addArabicPdf(doc);

    doc.text(data.report_title, 100, 20,"center")
    doc.text(data.report_disc, 100, 30,"center")
    const tableHeadValues = Object.values(data.headers).reverse();
    
    const bodyCells = tableBody.map(function(obj) {
      return Object.keys(obj).reverse().map(function(key) { 
        console.log(obj[key])
        return obj[key];
      });
    });
    // doc.addIamge(imgBase64,'JPEG', 15, 40, 180, 160)
    doc.autoTable({
        head: [tableHeadValues],
        body: bodyCells,
            startY: 50,
            theme: 'grid',
            bodyStyles:{
                fillColor:[0, 0, 139],
                textColor:[255,255,255],
                fontSize:12
            },
            styles: {
                font: "amiri",

                halign:"right",
                ...jsAutoTableOptions.styles,
              },
      })
        doc.save(data.report_title)
}

