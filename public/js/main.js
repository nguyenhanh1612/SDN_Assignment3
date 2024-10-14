// Xử lý sự kiện xóa Category và Product
document.querySelectorAll(".delete-button").forEach((button) => {
  button.addEventListener("click", function () {
    const itemId = this.dataset.id; // Lấy ID của item từ thuộc tính data-id
    const itemType = this.dataset.type; // Lấy loại item (category hoặc product)

    // Hiển thị popup xác nhận
    if (confirm(`Bạn có chắc chắn muốn xóa ${itemType} này không?`)) {
      deleteItem(itemId, itemType); // Gọi hàm xóa nếu người dùng xác nhận
    }
  });
});

// Hàm để xóa item (Category hoặc Product)
function deleteItem(itemId, itemType) {
  fetch(`/api/${itemType}/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi khi xóa"); // Ném lỗi nếu không thành công
      }
      return response.json(); // Trả về dữ liệu JSON
    })
    .then(() => {
      alert(`${itemType} đã được xóa thành công`); // Hiển thị thông báo thành công
      document.getElementById(`${itemType}-${itemId}`).remove(); // Xóa item khỏi giao diện
    })
    .catch((error) => {
      alert(`Lỗi: ${error.message}`); // Hiển thị lỗi nếu có
    });
}

// Hàm thêm mới Category hoặc Product
document
  .getElementById("add-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const formData = new FormData(this);
    const itemType = this.dataset.type; // Lấy loại item từ thuộc tính data-type

    fetch(`/api/${itemType}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData, // Gửi dữ liệu form
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi thêm mới"); // Ném lỗi nếu không thành công
        }
        return response.json(); // Trả về dữ liệu JSON
      })
      .then((data) => {
        alert(`${itemType} đã được thêm thành công`); // Hiển thị thông báo thành công
        // Cập nhật giao diện (thêm item mới vào danh sách)
        const newItemHtml = `<div id="${itemType}-${data._id}">${data.name} <button class="delete-button" data-id="${data._id}" data-type="${itemType}">Xóa</button></div>`;
        document
          .getElementById(`${itemType}-list`)
          .insertAdjacentHTML("beforeend", newItemHtml);
      })
      .catch((error) => {
        alert(`Lỗi: ${error.message}`); // Hiển thị lỗi nếu có
      });
  });
