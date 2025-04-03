document.addEventListener("DOMContentLoaded", function () {
    // Fungsi untuk login
    function login() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        let loginPopup = document.getElementById("loginPopup");
        let loginPopupMessage = document.getElementById("loginPopupMessage");

        if (username === "admin" && password === "Notaris@1992") {
            window.location.href = "pages/notaris.html"; // Redirect ke halaman notaris
        } else {
            loginPopupMessage.innerText = "Username atau password salah!";
            loginPopup.style.display = "block"; // Tampilkan popup error
            setTimeout(function () {
                document.querySelector(".popup-content").classList.add("active"); // Animasi popup
            }, 10);
        }
    }

    // Menutup popup saat tombol OK diklik
    document.getElementById("closeLoginPopup").addEventListener("click", function () {
        document.getElementById("loginPopup").style.display = "none"; // Menyembunyikan popup
        document.querySelector(".popup-content").classList.remove("active"); // Menghapus efek animasi
    });

    // Menangani pencarian status berkas
    document.getElementById("searchForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Menghindari refresh halaman
        const nikPemohon = document.getElementById("nikPemohon").value;
        if (nikPemohon.length === 16) {
            // Cek status berkas di sini
            document.getElementById("statusOutput").innerText = `Mencari status berkas dengan NIK: ${nikPemohon}`;
        } else {
            // Menampilkan pesan di dalam popup jika NIK tidak valid
            document.getElementById("popup-message").innerText = "NIK harus terdiri dari 16 digit!";
            document.getElementById("popup").style.display = "block";
            document.querySelector(".popup-content").classList.add("active"); // Animasi popup
        }
    });

    // Menambahkan berkas
    document.getElementById("submitBerkasBtn").addEventListener("click", function () {
        const nikPemohon = document.getElementById("nikPemohon").value;
        const additionalExplanation = document.getElementById("additionalExplanation").value;
        const namaPemohon = document.getElementById("namaPemohon").value;
        const tanggalPermohonan = document.getElementById("tanggalPermohonan").value;

        if (nikPemohon.length === 16 && namaPemohon && tanggalPermohonan) {
            // Simpan data berkas dan beri konfirmasi
            document.getElementById("popup-message").innerText = "Berkas berhasil ditambahkan!";
            document.getElementById("popup").style.display = "block";
            document.querySelector(".popup-content").classList.add("active"); // Animasi popup
        } else {
            // Menampilkan pesan jika form tidak valid
            document.getElementById("popup-message").innerText = "Semua kolom harus diisi dengan benar!";
            document.getElementById("popup").style.display = "block";
            document.querySelector(".popup-content").classList.add("active"); // Animasi popup
        }
    });

    // Menutup popup
    document.getElementById("closePopup").addEventListener("click", function () {
        document.getElementById("popup").style.display = "none";
        document.querySelector(".popup-content").classList.remove("active"); // Menghapus efek animasi
    });
});
