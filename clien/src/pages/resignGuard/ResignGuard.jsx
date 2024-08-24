import React, { useState } from "react";
import Header from "../../components/header/Header";

import "./ResignGuard.css";

import { saveAs } from "file-saver";
import * as docx from "docx";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from "docx";

const ResignGuard = () => {
  // Initial state for editable fields
  const [formData, setFormData] = useState({
    matkhau: "HÒN - TRE",
    nguoiCatGac: "HUỲNH HỮU THÀNH",
    mucCanhPhong: "CÔNG PHỤ",
    ngay: "18",
    thang: "01",
    nam: "2024",
    capBac: "Đại úy",
    chucVu: "Đại đội trưởng",
    donVi: "Đại đội 11",
    sdt: "0987157157",
    rows: [
      { time: "21.30 – 23.00", chiHuy: "Nguyễn Văn A", dungCu: "Dùi cui", nguoiGac: "Nguyễn Văn B", sungAK: "AK 1706p", nguoiDocGac: "Nguyễn Văn C" },
      { time: "23.00 – 00.30", chiHuy: "", dungCu: "", nguoiGac: "", sungAK: "", nguoiDocGac: "" },
      { time: "00.30 – 02.00", chiHuy: "", dungCu: "", nguoiGac: "", sungAK: "", nguoiDocGac: "" },
      { time: "02.00 – 03.30", chiHuy: "", dungCu: "", nguoiGac: "", sungAK: "", nguoiDocGac: "" },
      { time: "03.30 – 05.00", chiHuy: "", dungCu: "", nguoiGac: "", sungAK: "", nguoiDocGac: "" },
    ],
  });

  const handleInputChange = (e, rowIndex, field) => {
    if (rowIndex !== undefined) {
      const updatedRows = formData.rows.map((row, index) =>
        index === rowIndex ? { ...row, [field]: e.target.value } : row
      );
      setFormData({ ...formData, rows: updatedRows });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const exportToDocx = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: "ĐĂNG KÝ MỤC TIÊU GÁC", bold: true, size: 32 })],
              alignment: docx.AlignmentType.CENTER,
            }),
            new Paragraph(" "),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Mật khẩu:")] }),
                    new TableCell({ children: [new Paragraph(formData.matkhau)] }),
                    new TableCell({ children: [new Paragraph("Người cắt gác:")] }),
                    new TableCell({ children: [new Paragraph(formData.nguoiCatGac)] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Ngày:")] }),
                    new TableCell({ children: [new Paragraph(`${formData.ngay}/${formData.thang}/${formData.nam}`)] }),
                    new TableCell({ children: [new Paragraph("Mục canh phòng:")] }),
                    new TableCell({ children: [new Paragraph(formData.mucCanhPhong)] }),
                  ],
                }),
                // More rows for the table...
              ],
            }),
            new Paragraph(" "),
            new Table({
              rows: formData.rows.map((row) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph(row.time)] }),
                    new TableCell({ children: [new Paragraph(row.chiHuy)] }),
                    new TableCell({ children: [new Paragraph(row.dungCu)] }),
                    new TableCell({ children: [new Paragraph(row.nguoiGac)] }),
                    new TableCell({ children: [new Paragraph(row.sungAK)] }),
                    new TableCell({ children: [new Paragraph(row.nguoiDocGac)] }),
                  ],
                })
              ),
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "DangKyMucGac.docx");
    });
  };

  return (
    <>
      <Header />
      <div className="container-fluid p-10">
        <div id="body-header" className="grid grid-cols-3">
          <div className="text-center">
            <label className="font-bold">Mật khẩu: </label>
            <input
              className="border p-1 rounded text-red-600 font-bold"
              value={formData.matkhau}
              name="matkhau"
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              ĐĂNG KÝ MỤC TIÊU GÁC
            </h1>
          </div>
          <div className="text-center">
            <h4 className="text-red-600 font-bold">
              TIỂU ĐOÀN 4
            </h4>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-collum">
            <label>Người cắt gác:</label>
            <input
              className="border p-1 rounded"
              value={formData.nguoiCatGac}
              name="nguoiCatGac"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-collum">
            <label>Cấp bậc:</label>
            <input
              className="border p-1 rounded"
              value={formData.nguoiCatGac}
              name="nguoiCatGac"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-collum">
            <label>Chức vụ:</label>
            <input
              className="border p-1 rounded"
              value={formData.nguoiCatGac}
              name="nguoiCatGac"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-collum">
            <label>Đơn vị:</label>
            <input
              className="border p-1 rounded"
              value={formData.nguoiCatGac}
              name="nguoiCatGac"
              onChange={handleInputChange}
            />
          </div>

        </div>

        <div className="flex justify-between items-center my-4">
          <div className="flex flex-collum">
            <label>Mục canh phòng:</label>
            <input
              className="border p-1 rounded"
              value={formData.mucCanhPhong}
              name="mucCanhPhong"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-collum">
            <label>Mục canh phòng:</label>
            <input
              className="border p-1 rounded"
              value={formData.mucCanhPhong}
              name="mucCanhPhong"
              onChange={handleInputChange}
            />
          </div>

        </div>
        <div className="flex items-center my-4">
          <div className="flex flex-collum">
            <label>Ngày:</label>
            <input
              className="border p-1 rounded"
              value={formData.ngay}
              name="ngay"
              onChange={handleInputChange}
              style={{ width: '64px' }}
            />
          </div>
          <div className="flex flex-collum">
            <label>Tháng:</label>
            <input
              className="border p-1 rounded"
              value={formData.thang}
              name="thang"
              onChange={handleInputChange}
              style={{ width: '64px' }}
            />
          </div>
          <div className="flex flex-collum">
            <label>Năm:</label>
            <input
              className="border p-1 rounded "
              value={formData.nam}
              name="nam"
              onChange={handleInputChange}
              style={{ width: '64px' }}
            />
          </div>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">Thời gian</th>
              <th className="border border-gray-400 p-2">Chỉ huy gác</th>
              <th className="border border-gray-400 p-2">Dùi cui, Cc hỗ trợ</th>
              <th className="border border-gray-400 p-2">Người gác</th>
              <th className="border border-gray-400 p-2">Súng AK</th>
              <th className="border border-gray-400 p-2">Người đốc gác, dẫn gác, chứng kiến bàn giao</th>
            </tr>
          </thead>
          <tbody>
            {formData.rows.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2">{row.time}</td>
                <td className="border border-gray-400 p-2">
                  <input
                    className="border p-1 rounded"
                    value={row.chiHuy}
                    onChange={(e) => handleInputChange(e, index, "chiHuy")}
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    className="border p-1 rounded"
                    value={row.dungCu}
                    onChange={(e) => handleInputChange(e, index, "dungCu")}
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    className="border p-1 rounded"
                    value={row.nguoiGac}
                    onChange={(e) => handleInputChange(e, index, "nguoiGac")}
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    className="border p-1 rounded"
                    value={row.sungAK}
                    onChange={(e) => handleInputChange(e, index, "sungAK")}
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    className="border p-1 rounded"
                    value={row.nguoiDocGac}
                    onChange={(e) => handleInputChange(e, index, "nguoiDocGac")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={exportToDocx}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Xuất ra file .doc
        </button>
      </div>
    </>

  );
};

export default ResignGuard;

