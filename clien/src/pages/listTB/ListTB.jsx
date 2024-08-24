import React from "react";
import Header from "../../components/header/Header";
import * as XLSX from "xlsx";

import "./ListTB.css";

const exportToExcel = () => {
  const data = [
    { name: "Phòng Đào tạo", status: "Đã đăng ký", approval: "Kiểm duyệt" },
    { name: "Phòng Chính trị", status: "Chưa đăng ký báo ban", approval: "Kiểm duyệt" },
    { name: "Phòng HC - KT", status: "Chưa đăng ký báo ban", approval: "Kiểm duyệt" },
    // ... more data
  ];

  // Convert the data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "TrucBanTacChien");

  // Export the Excel file
  XLSX.writeFile(workbook, "TrucBanTacChien.xlsx");
};

const ListTB = () => {
  const rooms = [
    { name: "Phòng Đào tạo", status: "Đã đăng ký", approval: "Kiểm duyệt" },
    { name: "Phòng Chính trị", status: "Chưa đăng ký báo ban", approval: "Kiểm duyệt" },
    { name: "Phòng HC - KT", status: "Chưa đăng ký báo ban", approval: "Kiểm duyệt" },
  ];

  const departments = [
    { name: "Khoa Chính trị", status: "Đã đăng ký", approval: "Kiểm duyệt" },
    { name: "Khoa HC - KT", status: "Chưa đăng ký báo ban", approval: "Kiểm duyệt" },
    { name: "Khoa Binh chủng", status: "Đang ký báo ban", approval: "Kiểm duyệt" },
    { name: "Khoa BCHT", status: "Chưa đăng ký báo ban", approval: "Kiểm duyệt" },
  ];

  const battalions = [
    { name: "Tiểu đoàn 1", status: "Chưa đăng ký báo ban", approval: "Kiểm duyệt" },
    { name: "Tiểu đoàn 2", status: "Đã đăng ký", approval: "Kiểm duyệt" },
    { name: "Tiểu đoàn 3", status: "Chưa đăng ký báo ban", approval: "Kiểm duyệt" },
    { name: "Tiểu đoàn 4", status: "Đang ký báo ban", approval: "Kiểm duyệt" },
  ];

  const statusOptions = ["Đã đăng ký", "Chưa đăng ký báo ban", "Đang ký báo ban"];
  const approvalOptions = ["Kiểm duyệt"];

  const renderRow = (item) => (
    <div className="flex justify-between items-center p-2 border-b">
      <span>{item.name}</span>
      <select className="border p-1 rounded">
        {statusOptions.map((status) => (
          <option key={status} selected={item.status === status}>
            {status}
          </option>
        ))}
      </select>
      <select className="border p-1 rounded">
        {approvalOptions.map((approval) => (
          <option key={approval} selected={item.approval === approval}>
            {approval}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">TRỰC BAN TÁC CHIẾN</h2>

        <h3 className="text-lg font-semibold">Khối Phòng</h3>
        {rooms.map(renderRow)}

        <h3 className="text-lg font-semibold mt-4">Khối Khoa</h3>
        {departments.map(renderRow)}

        <h3 className="text-lg font-semibold mt-4">Khối Tiểu Đoàn</h3>
        {battalions.map(renderRow)}
      </div>
    </>

  );
};

export default ListTB;
