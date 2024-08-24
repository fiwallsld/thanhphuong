import Header from "../../components/header/Header";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from "docx";
import "./ReportEdu.css";

const ReportEdu = () => {
  // State for holding input values
  const [reportData, setReportData] = useState({
    total: "",
    present: "",
    absent: "",
    reason: "",
    activity: "",
    remarks: "",
    equipment: "",
    suddenWork: "",
    taskSituation: "",
    dutyOfficer: "Trung úy Trần Thanh Phương",
    commander: "Thiếu tá Trần Đình Đông Phương",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value,
    });
  };

  // Export the report to a Word document
  const exportToDoc = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: "BÁO BAN GIÁO DỤC-ĐÀO TẠO", bold: true, size: 32 })],
              alignment: "center",
            }),
            new Paragraph(" "),
            new Paragraph({
              children: [
                new TextRun({ text: "Mật khẩu: HÒN - TRE", bold: true, size: 24 }),
              ],
              alignment: "center",
            }),
            new Paragraph({
              children: [new TextRun({ text: "TIỂU ĐOÀN 4", bold: true, size: 24 })],
              alignment: "center",
            }),
            new Paragraph(" "),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Tổng quân số")] }),
                    new TableCell({ children: [new Paragraph(reportData.total)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Có mặt")] }),
                    new TableCell({ children: [new Paragraph(reportData.present)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Vắng mặt")] }),
                    new TableCell({ children: [new Paragraph(reportData.absent)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Lý do")] }),
                    new TableCell({ children: [new Paragraph(reportData.reason)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph("Hoạt động chính của đơn vị trong ngày")],
                    }),
                    new TableCell({ children: [new Paragraph(reportData.activity)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph("Nhận xét ưu khuyết điểm trong ngày về nội vụ")],
                    }),
                    new TableCell({ children: [new Paragraph(reportData.remarks)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph("Vũ khí trang bị lớn mang ra khỏi đơn vị")],
                    }),
                    new TableCell({ children: [new Paragraph(reportData.equipment)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Những công việc đột xuất xảy ra")] }),
                    new TableCell({ children: [new Paragraph(reportData.suddenWork)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(
                          "Tình hình thực hiện nhiệm vụ của phân đội canh phòng và các phân đội khác"
                        ),
                      ],
                    }),
                    new TableCell({ children: [new Paragraph(reportData.taskSituation)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Trực ban nội vụ")] }),
                    new TableCell({ children: [new Paragraph(reportData.dutyOfficer)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Trực chỉ huy")] }),
                    new TableCell({ children: [new Paragraph(reportData.commander)] }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Convert the document to a blob and trigger the download
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "BaoBanNoiVu.docx");
    });
  };

  return (
    <>
      <Header />
      <div className="container-fluid p-10">
        <div id="body-header" className="grid grid-cols-4">
          <div className="text-center">
            <label className="font-bold">Mật khẩu: </label>
            <span className="text-red-600 font-bold"> HÒN - TRE</span>
          </div>
          <div className="text-center col-span-2">
            <h1 className="text-3xl font-bold">BÁO BAN GIÁO DỤC-ĐÀO TẠO</h1>
          </div>
          <div className="text-center">
            <h4 className="text-red-600 font-bold">TIỂU ĐOÀN 4</h4>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100">
          <div className="bg-gray-100 p-4 rounded-md max-w-sm">
            <div className="mb-4 flex items-center">
              <label htmlFor="total" className="font-bold w-28">Tổng quân số:</label>
              <input type="number" name="total" id="total" className="bg-gray-300 h-6 w-48 rounded-md" value={reportData.total} onChange={handleInputChange} />
            </div>

            <div className="mb-4 flex items-center">
              <label htmlFor="present" className="font-bold w-28">Có mặt:</label>
              <input type="number" name="present" id="present" className="bg-gray-300 h-6 w-48 rounded-md" value={reportData.present} onChange={handleInputChange} />
            </div>

            <div className="mb-4 flex items-center">
              <label htmlFor="absent" className="font-bold w-28">Vắng mặt:</label>
              <input type="number" name="absent" id="absent" className="bg-gray-300 h-6 w-48 rounded-md" value={reportData.absent} onChange={handleInputChange} />
            </div>

            <div className="flex items-start">
              <label htmlFor="reason" className="font-bold w-28">Lý do:</label>
              <textarea name="reason" id="reason" rows="4" className="bg-gray-300 w-48 h-20 rounded-md" value={reportData.reason} onChange={handleInputChange}></textarea>
            </div>
          </div>

          <div className="bg-gray-200 p-4 rounded-md">
            <div className="font-bold">HOẠT ĐỘNG CHÍNH CỦA ĐƠN VỊ TRONG NGÀY</div>
            <textarea name="activity" className="bg-gray-300 w-full h-32 mt-2 rounded-md" value={reportData.activity} onChange={handleInputChange}></textarea>
          </div>

          <div className="bg-gray-200 p-4 rounded-md">
            <div className="font-bold">NHẬN XÉT ƯU KHUYẾT ĐIỂM TRONG NGÀY VỀ NỘI VỤ</div>
            <textarea name="remarks" className="bg-gray-300 w-full h-32 mt-2 rounded-md" value={reportData.remarks} onChange={handleInputChange}></textarea>
          </div>

          <div className="">
            <div className="col-span-3 bg-gray-200 p-4 rounded-md">
              <div className="font-bold">Vũ khí trang bị lớn mang ra khỏi đơn vị:</div>
              <input name="equipment" type="text" className="bg-gray-300 h-6 w-full mt-2 rounded-md" value={reportData.equipment} onChange={handleInputChange} />
            </div>

            <div className="col-span-3 bg-gray-200 p-4 rounded-md">
              <div className="font-bold">NHỮNG CÔNG VIỆC ĐỘT XUẤT XẢY RA</div>
              <textarea name="suddenWork" className="bg-gray-300 w-full h-20 mt-2 rounded-md" value={reportData.suddenWork} onChange={handleInputChange}></textarea>
            </div>

          </div>


          <div className="bg-gray-200 p-4 rounded-md">
            <div className="font-bold">TÌNH HÌNH THỰC HIỆN NHIỆM VỤ CỦA PHÂN ĐỘI CANH PHÒNG VÀ CÁC PHÂN ĐỘI KHÁC</div>
            <textarea name="taskSituation" className="bg-gray-300 w-full h-32 mt-2 rounded-md" value={reportData.taskSituation} onChange={handleInputChange}></textarea>
          </div>

          <div className="bg-gray-200 p-4 rounded-md text-center">
            <div>
              <div className="font-bold">TRỰC BAN NỘI VỤ</div>
              <div>{reportData.dutyOfficer}</div>
            </div>
            <div>
              <div className="font-bold">TRỰC CHỈ HUY</div>
              <div>{reportData.commander}</div>
            </div>

            <div className="col-span-3 text-center mt-8">
              <button className="bg-red-600 text-white font-bold py-2 px-4 me-2 rounded-md" onClick={exportToDoc}>
                LƯU FILE
              </button>
              <button class="bg-red-600 text-white font-bold py-2 px-4 rounded-md">BÁO BAN</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportEdu;
