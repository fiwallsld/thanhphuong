import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import React from "react";
import { useUser } from "../../store/userContext";
import "./ReportPolitic.css";

const ReportPolitic = () => {
  const { userAxios } = useUser();
  const location = useLocation();
  return (
    <>
      <Header />
      <div className="container-fluid p-10">
        <div id="body-header" className="grid grid-cols-3">
          <div className="text-center">
            <label className="font-bold">Mật khẩu: </label>
            <span className="text-red-600 font-bold"> HÒN - TRE</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              BÁO BAN CHÍNH TRỊ
            </h1>
          </div>
          <div className="text-center">
            <h4 className="text-red-600 font-bold">
              TIỂU ĐOÀN 4
            </h4>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 p-4 bg-gray-100">
          {/* <!-- Quân Số --> */}
          <div class="bg-gray-100 p-4 rounded-md max-w-sm">
            <div class="mb-4 flex items-center">
              <label htmlFor="total" class="font-bold w-28">Tổng quân số:</label>
              <input type="number" name="total" id="total" class="bg-gray-300 h-6 w-48 rounded-md" />
            </div>

            <div class="mb-4 flex items-center">
              <label htmlFor="present" class="font-bold w-28">Có mặt:</label>
              <input type="number" name="present" id="present" class="bg-gray-300 h-6 w-48 rounded-md" />
            </div>

            <div class="mb-4 flex items-center">
              <label htmlFor="absent" class="font-bold w-28">Vắng mặt:</label>
              <input type="number" name="absent" id="absent" class="bg-gray-300 h-6 w-48 rounded-md" />
            </div>

            <div class="flex items-start">
              <label htmlFor="reason" class="font-bold w-28">Lý do:</label>
              <textarea name="reason" id="reason" rows="4" class="bg-gray-300 w-48 h-20 rounded-md"></textarea>
            </div>
          </div>

          {/* <!-- Hoạt động chính --> */}
          <div class="bg-gray-200 p-4 rounded-md">
            <div class="font-bold">HOẠT ĐỘNG CHÍNH CỦA ĐƠN VỊ TRONG NGÀY</div>
            <textarea class="bg-gray-300 w-full h-32 mt-2 rounded-md"></textarea>
          </div>

          {/* <!-- Nhận xét ưu khuyết điểm --> */}
          <div class="bg-gray-200 p-4 rounded-md">
            <div class="font-bold">NHẬN XÉT ƯU KHUYẾT ĐIỂM TRONG NGÀY VỀ NỘI VỤ</div>
            <textarea class="bg-gray-300 w-full h-32 mt-2 rounded-md"></textarea>
          </div>

          <div>
            {/* <!-- Vũ khí trang bị lớn --> */}
            <div class="col-span-3 bg-gray-200 p-4 rounded-md">
              <div class="font-bold">Vũ khí trang bị lớn mang ra khỏi đơn vị:</div>
              <input type="text" class="bg-gray-300 h-6 w-full mt-2 rounded-md" />
            </div>

            {/* <!-- Công việc đột xuất --> */}
            <div class="col-span-3 bg-gray-200 p-4 rounded-md">
              <div class="font-bold">NHỮNG CÔNG VIỆC ĐỘT XUẤT XẢY RA</div>
              <textarea class="bg-gray-300 w-full h-20 mt-2 rounded-md"></textarea>
            </div>
          </div>


          {/* <!-- Tình hình thực hiện nhiệm vụ --> */}
          <div class="bg-gray-200 p-4 rounded-md">
            <div class="font-bold">TÌNH HÌNH THỰC HIỆN NHIỆM VỤ CỦA PHÂN ĐỘI CANH PHÒNG VÀ CÁC PHÂN ĐỘI KHÁC</div>
            <textarea class="bg-gray-300 w-full h-32 mt-2 rounded-md"></textarea>
          </div>

          {/* <!-- Trực chỉ huy --> */}
          <div class="bg-gray-200 p-4 rounded-md text-center">
            <div>
              <div class="font-bold">TRỰC BAN NỘI VỤ</div>
              <div>Trung úy Trần Thanh Phương</div>
            </div>
            <div>
              <div class="font-bold">TRỰC CHỈ HUY</div>
              <div>Thiếu tá Trần Đình Đông Phương</div>
            </div>

            <div class="col-span-3 text-center">
              <button class="bg-red-600 text-white font-bold py-2 px-4 rounded-md">BÁO BAN</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ReportPolitic;
