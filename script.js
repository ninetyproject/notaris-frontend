// Function to handle login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "Notaris@1992") {
        window.location.href = "pages/notaris-dashboard.html"; // Redirect to notaris dashboard
    } else {
        document.getElementById("errorMessage").style.display = "block"; // Show error message
    }
});

// Ensure only numeric input for NIK field
document.getElementById("nikInput").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, ""); // Hapus semua karakter selain angka
});

// Function to search berkas
function cariBerkas() {
    let nikInput = document.getElementById("nikInput");
    nikInput.value = nikInput.value.replace(/\D/g, ""); // Hapus semua karakter selain angka
    let nik = nikInput.value; // Ambil nilai input NIK setelah difilter
    let hasilDiv = document.getElementById("hasilPencarian");

    // Sample data (replace with database logic later)
    let dataBerkas = {
        "5108056706720002": {
            status: "Pelayanan Telah Diproses",
            tambahan: "Proses BPHTB"
        },
        "5108056706720003": {
            status: "Pelayanan Telah Selesai",
            tambahan: ""
        }
    };

    // Check if NIK exists in data
    if (dataBerkas[nik]) {
        let hasil = `
            <div class="berkas">
                <p><strong>Kode:</strong> ${nik}</p>
                <p><strong>Status:</strong> ${dataBerkas[nik].status}</p>
                <p>${dataBerkas[nik].tambahan}</p>
                <p>Informasi Selengkapnya, Hubungi Kami melalui: 
                   <a href="https://wa.me/6281234567890">WhatsApp</a></p>
            </div>
        `;
        hasilDiv.innerHTML = hasil;
    } else {
        hasilDiv.innerHTML = `<p style="color: red;">Berkas tidak ditemukan.</p>`;
    }
}
