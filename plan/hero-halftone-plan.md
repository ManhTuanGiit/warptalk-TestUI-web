# Yêu cầu tính năng: Halftone Wave Hero Section & Theme Scroll

## 1. Mục tiêu
Tạo một Hero Section cho Landing Page với background là hiệu ứng sóng các chấm Halftone (Dot matrix) chuyển động từ trái qua phải. Khi người dùng cuộn trang xuống section tiếp theo, theme tổng thể sẽ mượt mà chuyển từ Light Mode sang Dark Mode.

## 2. Yêu cầu kỹ thuật
* **Halftone Render:** Sử dụng HTML5 Canvas (hoặc Three.js Shader) để đảm bảo độ nét tuyệt đối (vector-like), không bị vỡ hạt (pixelated).
* **Animation Sóng:** Sóng chạy theo phương ngang (X-axis) từ trái sang phải bằng cách dùng hàm Sine tính toán bán kính của các dot dựa trên vị trí và thời gian.
* **Scroll Theme:** Dùng thư viện GSAP (hoặc IntersectionObserver) để đổi CSS Variables từ Light sang Dark khi scroll qua 50% chiều cao của Hero Section.

## 3. Cấu trúc UI
* [Mô tả các thành phần Text, Nút bấm nằm đè lên trên Canvas]