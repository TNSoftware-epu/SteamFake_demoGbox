/* =========================================
   FILE: store.js
   CHỨC NĂNG: Xử lý slideshow banner trên trang store.html
   GHI CHÚ: Code cơ bản, dễ hiểu cho người mới học
========================================= */

/* 
   BIẾN GLOBAL - Lưu trữ thông tin slideshow
   Các biến này có thể được truy cập từ bất kỳ đâu trong file
*/

// Biến lưu số slide hiện tại (bắt đầu từ 0)
let currentSlideIndex = 0;

// Biến lưu tất cả các slide
let allSlides = [];

// Biến lưu tất cả các dots
let allDots = [];

// Biến để lưu ID của hàm autoSlide (dùng để dừng/tiếp tục)
let autoSlideInterval;


/* =========================================
   HÀM KHỞI TẠO - Chạy khi trang load xong
========================================= */

/*
   Hàm này được gọi khi trang HTML được tải xong
   Dùng để setup slideshow ban đầu
*/
function initSlideshow() {
    // Lấy tất cả các phần tử có class 'slide' từ HTML
    allSlides = document.querySelectorAll('.slide');
    
    // Lấy tất cả các phần tử có class 'dot' từ HTML
    allDots = document.querySelectorAll('.dot');
    
    // Hiển thị slide đầu tiên (index = 0)
    currentSlideIndex = 0;
    updateSlideDisplay();
    
    // Bắt đầu slideshow tự động (chuyển slide sau mỗi 5 giây)
    autoSlide();
}


/* =========================================
   HÀM THAY ĐỔI SLIDE - Bấm nút trái/phải
========================================= */

/*
   Hàm này được gọi khi người dùng bấm nút trái hoặc phải
   @param direction - số nguyên: 1 để tới slide sau, -1 để quay lại slide trước
*/
function changeSlide(direction) {
    // Dừng auto-slide khi người dùng tương tác
    clearInterval(autoSlideInterval);
    
    // Thay đổi index: cộng direction (1 hoặc -1)
    currentSlideIndex += direction;
    
    // Nếu index vượt quá số slide, quay lại slide đầu
    // ví dụ: có 6 slide (0-5), nếu index = 6 thì quay lại 0
    if (currentSlideIndex >= allSlides.length) {
        currentSlideIndex = 0;
    }
    
    // Nếu index âm (bé hơn 0), nhảy tới slide cuối
    // ví dụ: nếu index = -1 thì nhảy tới slide cuối
    if (currentSlideIndex < 0) {
        currentSlideIndex = allSlides.length - 1;
    }
    
    // Cập nhật hiển thị slide
    updateSlideDisplay();
    
    // Bắt đầu lại auto-slide
    autoSlide();
}


/* =========================================
   HÀM NHẢY ĐẾN SLIDE CỤ THỂ - Bấm vào dots
========================================= */

/*
   Hàm này được gọi khi người dùng bấm vào một dot
   @param slideIndex - số nguyên: chỉ số của slide muốn hiển thị (0, 1, 2, ...)
*/
function currentSlide(slideIndex) {
    // Dừng auto-slide khi người dùng tương tác
    clearInterval(autoSlideInterval);
    
    // Gán slideIndex cho biến global
    currentSlideIndex = slideIndex;
    
    // Cập nhật hiển thị slide
    updateSlideDisplay();
    
    // Bắt đầu lại auto-slide
    autoSlide();
}


/* =========================================
   HÀM CẬP NHẬT HIỂN THỊ - Cập nhật active slide
========================================= */

/*
   Hàm này cập nhật giao diện để hiển thị slide đúng
   - Ẩn tất cả các slide (loại bỏ class 'active')
   - Hiển thị slide hiện tại (thêm class 'active')
   - Cập nhật dots để khớp với slide hiện tại
*/
function updateSlideDisplay() {
    // Duyệt qua TẤT CẢ các slide
    for (let i = 0; i < allSlides.length; i++) {
        // Nếu i bằng currentSlideIndex, thì slide này là active
        if (i === currentSlideIndex) {
            allSlides[i].classList.add('active');  // Thêm class 'active' để hiển thị
        } else {
            // Ngược lại, loại bỏ class 'active' để ẩn
            allSlides[i].classList.remove('active');
        }
    }
    
    // Duyệt qua TẤT CẢ các dots
    for (let i = 0; i < allDots.length; i++) {
        // Nếu i bằng currentSlideIndex, thì dot này là active
        if (i === currentSlideIndex) {
            allDots[i].classList.add('active');  // Thêm class 'active' để bật sáng
        } else {
            // Ngược lại, loại bỏ class 'active' để tắt
            allDots[i].classList.remove('active');
        }
    }
}


/* =========================================
   HÀM SLIDESHOW TỰ ĐỘNG - Tự động chuyển slide
========================================= */

/*
   Hàm này tạo một interval (vòng lặp) để tự động chuyển slide
   Slide sẽ chuyển tiếp theo sau mỗi 5000 mili giây (5 giây)
*/
function autoSlide() {
    // setInterval() tạo một vòng lặp lặp lại
    // Tham số 1: hàm callback - chạy mỗi lần interval kích hoạt
    // Tham số 2: thời gian (mili giây) - 5000ms = 5 giây
    autoSlideInterval = setInterval(function() {
        // Tăng currentSlideIndex thêm 1 (chuyển sang slide tiếp theo)
        currentSlideIndex++;
        
        // Nếu vượt quá số slide, quay lại slide đầu
        if (currentSlideIndex >= allSlides.length) {
            currentSlideIndex = 0;
        }
        
        // Cập nhật hiển thị
        updateSlideDisplay();
    }, 5000);  // Mỗi 5 giây
}


/* =========================================
   KHỞI TẠO KHI TRANG LOAD
========================================= */

/*
   Event listener: DOMContentLoaded
   - DOMContentLoaded được kích hoạt khi HTML được tải xong
   - Điều này đảm bảo tất cả phần tử HTML có sẵn trước khi code chạy
   - Khác với load event (chờ tất cả ảnh tải xong)
*/
document.addEventListener('DOMContentLoaded', function() {
    // Gọi hàm initSlideshow() để khởi tạo slideshow
    initSlideshow();
});
