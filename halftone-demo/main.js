/**
 * main.js - Halftone Wave Animation & Scroll Theme Controller
 */

// 1. --- Cấu hình Canvas & Animation Halftone Wave ---
const canvas = document.getElementById('halftone-canvas');
const ctx = canvas.getContext('2d');

let width, height;
const COLUMNS = 45; // Mật độ lưới: Khoảng 40-50 cột theo yêu cầu
let spacing; // Khoảng cách giữa các chấm (tính theo pixel)
let rows;

// Trạng thái chuột cho phần tương tác
let mouse = { x: -1000, y: -1000 };
let isHovering = false;

/**
 * Xử lý resize để đảm bảo Retina Display luôn sắc nét
 */
function resize() {
  // Lấy kích thước thực tế của Hero section chứa canvas
  const rect = canvas.parentElement.getBoundingClientRect();
  width = rect.width;
  height = rect.height;

  // Sử dụng window.devicePixelRatio để xử lý độ sắc nét trên màn hình Retina/High DPI
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  
  // Scale context để mọi toạ độ vẽ phía sau không cần nhân thêm dpr thủ công
  ctx.scale(dpr, dpr);
  
  // Tính toán lại khoảng cách (spacing) và số lượng hàng (rows) dựa trên kích thước mới
  spacing = width / COLUMNS;
  rows = Math.ceil(height / spacing);
}

// Lắng nghe sự kiện resize trình duyệt
window.addEventListener('resize', resize);

/**
 * Xử lý sự kiện di chuột (Hover interaction)
 */
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  isHovering = true;
});

canvas.addEventListener('mouseleave', () => {
  isHovering = false;
  // Di chuyển chuột ra xa khỏi canvas để chấm dứt hiệu ứng hover
  mouse.x = -1000;
  mouse.y = -1000;
});

/**
 * Render Loop - Vòng lặp vẽ Animation
 */
let time = 0;
function render() {
  // Xoá toàn bộ canvas trước khi vẽ frame mới
  ctx.clearRect(0, 0, width, height);
  
  // Lấy màu chấm dot linh động từ biến CSS (cho phép thay đổi màu khi đổi theme)
  const computedStyle = getComputedStyle(document.documentElement);
  const dotColor = computedStyle.getPropertyValue('--dot-color').trim() || '#3b82f6';
  ctx.fillStyle = dotColor;

  // Vẽ lưới các chấm Halftone
  for (let i = 0; i < COLUMNS; i++) {
    for (let j = 0; j < rows; j++) {
      // Xác định tâm (x, y) của từng chấm
      const x = i * spacing + spacing / 2;
      const y = j * spacing + spacing / 2;
      
      // -- A. Hiệu ứng Wave (Sóng hình Sine chạy từ trái sang phải) --
      const waveFreq = 0.15; // Tần số bước sóng
      const waveSpeed = time * 0.03; // Vận tốc sóng chạy
      
      // Hàm Sine phụ thuộc vào cột (i) và thời gian (time)
      // Math.sin trả về [-1, 1], ta chuẩn hoá nó về khoảng [0, 1]
      const sineValue = (Math.sin(i * waveFreq - waveSpeed) + 1) / 2;
      
      // Xác định bán kính min và max dựa trên spacing
      const minRadius = spacing * 0.05;
      const maxRadius = spacing * 0.35;
      
      // Tính bán kính cơ sở cho chấm tròn hiện tại
      let radius = minRadius + sineValue * (maxRadius - minRadius);

      // -- B. Hiệu ứng Tương tác Chuột (Phóng to khi ở gần) --
      if (isHovering) {
        // Tính khoảng cách Euclidean từ chuột đến tâm chấm
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const hoverInfluenceRadius = spacing * 5; // Vùng ảnh hưởng của chuột
        
        if (distance < hoverInfluenceRadius) {
          // influence = 1 (khi chuột ngay trên tâm) -> 0 (khi chạm rìa vùng ảnh hưởng)
          const influence = 1 - (distance / hoverInfluenceRadius);
          
          // Cộng thêm một lượng bán kính, giúp chấm phình to
          const bonusRadius = influence * (spacing * 0.5);
          radius += bonusRadius;
          
          // Giới hạn bán kính tối đa để tránh các chấm dính liền vào nhau
          radius = Math.min(radius, spacing * 0.6);
        }
      }

      // -- C. Vẽ chấm tròn --
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Tăng bộ đếm thời gian và gọi render frame tiếp theo
  time++;
  requestAnimationFrame(render);
}

// Khởi tạo kích thước ban đầu và kích hoạt vòng lặp render
resize();
requestAnimationFrame(render);


// 2. --- Scroll Theme Controller (Light -> Dark) ---
/**
 * Chuyển đổi Theme tự động khi người dùng cuộn khỏi Hero Section
 * Sử dụng IntersectionObserver để tối ưu hiệu suất (thay vì bắt sự kiện scroll)
 */
function setupScrollTheme() {
  // Lựa chọn Section 2 làm điểm móc để theo dõi
  const section2 = document.getElementById('section2');
  if (!section2) return;

  const observerOptions = {
    root: null, // null nghĩa là dùng Viewport làm gốc quan sát
    // rootMargin: Kích hoạt khi cạnh trên của Section 2 đi vào 50% chiều cao màn hình từ dưới lên
    // (tương đương với việc người dùng đã cuộn qua 50% Hero Section)
    rootMargin: "-50% 0px -50% 0px", 
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section 2 đã đi vào vùng giữa màn hình -> Gán theme "dark"
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        // Khi Section 2 đi ra khỏi vùng giữa màn hình:
        // Nếu cạnh trên của nó nằm ở phía dưới viewport -> Nghĩa là đang cuộn ngược lên trên Hero -> Quay về "light"
        if (entry.boundingClientRect.top > 0) {
          document.documentElement.removeAttribute('data-theme');
        }
        // Nếu nó đi ra khỏi màn hình theo hướng lên trên (tức là cuộn sâu xuống Section 3, 4...) -> Vẫn giữ "dark"
      }
    });
  }, observerOptions);

  observer.observe(section2);
}

// Khởi động trình quan sát cuộn trang
setupScrollTheme();
