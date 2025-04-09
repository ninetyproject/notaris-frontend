console.log("✅ script.js terbaca");

// Fungsi hanya dijalankan jika berada di halaman client.html
if (window.location.href.includes("client.html")) {
    console.log("✅ client.html terdeteksi");

    // Data sample (sementara, nanti diganti dengan fetch dari backend)
    const dataBerkas = [
        {
            nik: "5108056706720002",
            nama: "Orang A",
            tanggal: "02-03-2025",
            status: "Pelayanan Telah Diproses",
            tambahan: "Proses BPN"
        },
        {
            nik: "5108056706720002",
            nama: "Orang A",
            tanggal: "01-12-2024",
            status: "Pelayanan Telah Diproses",
            tambahan: "Proses BPHTB"
        },
        {
            nik: "5108056706720003",
            nama: "Orang B",
            tanggal: "27-02-2025",
            status: "Pelayanan Telah Selesai",
            tambahan: ""
        },
        {
            nik: "5108056706720004",
            nama: "Orang C",
            tanggal: "02-12-2024",
            status: "Pelayanan Telah Diproses",
            tambahan: "Proses BPHTB"
        }
    ];

    function cariBerkas() {
        console.log("🔍 cariBerkas dipanggil");

        const nikInput = document.getElementById("nikInput");
        const hasilDiv = document.getElementById("hasilPencarian");

        if (!nikInput || !hasilDiv) {
            console.warn("❗ Input atau hasil div tidak ditemukan");
            return;
        }

        const nik = nikInput.value.trim();
        hasilDiv.innerHTML = "";

        if (!/^\d{16}$/.test(nik)) {
            const p = document.createElement("p");
            p.style.color = "red";
            p.textContent = "Masukkan NIK 16 digit angka tanpa huruf atau karakter lain.";
            hasilDiv.appendChild(p);
            return;
        }

        const hasil = dataBerkas.filter(item => item.nik === nik);

        if (hasil.length === 0) {
            const p = document.createElement("p");
            p.style.color = "red";
            p.textContent = "Pelayanan tidak ditemukan.";
            hasilDiv.appendChild(p);
            return;
        }

        // Urutkan dari tanggal terbaru ke terlama
        hasil.sort((a, b) => {
            const [dayA, monthA, yearA] = a.tanggal.split("-").map(Number);
            const [dayB, monthB, yearB] = b.tanggal.split("-").map(Number);
            return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
        });

        hasil.forEach((item) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("berkas");

            const header = document.createElement("div");
            header.classList.add("berkas-header");
            header.style.cursor = "pointer";
            header.innerHTML = `
                <strong>${sanitizeText(item.nik)}. Tanggal Permohonan: ${sanitizeText(item.tanggal)}</strong> 
                <span style="float:right;">&#9660;</span>
            `;
            wrapper.appendChild(header);

            const detail = document.createElement("div");
            detail.classList.add("berkas-detail");
            detail.style.display = "none";

            // Gunakan textContent untuk isi teks agar aman dari XSS
            const isiDetail = document.createElement("div");
            isiDetail.innerHTML = `
                <p><strong>Kode:</strong> ${sanitizeText(item.nik)}</p>
                <p><strong>Pemohon Atas Nama:</strong> ${sanitizeText(item.nama)}</p>
                <p><strong>Status:</strong> ${sanitizeText(item.status)}</p>
                ${item.status !== "Pelayanan Telah Selesai" && item.tambahan ? `<p style="margin-top: 8px;">${sanitizeText(item.tambahan)}</p>` : ""}
                <p>Informasi Selengkapnya, Hubungi Kami melalui: 
                   <a href="https://wa.me/6281234567890" target="_blank">WhatsApp</a>
                </p>
            `;
            detail.appendChild(isiDetail);

            header.addEventListener("click", () => {
                detail.style.display = detail.style.display === "none" ? "block" : "none";
            });

            wrapper.appendChild(detail);
            hasilDiv.appendChild(wrapper);
        });
    }

    // Fungsi sanitasi sederhana untuk mencegah XSS
    function sanitizeText(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    window.cariBerkas = cariBerkas;
}


// Fungsi menampilkan popup login error
function showLoginError() {
    const overlay = document.getElementById("login-error-overlay");
    const popup = document.getElementById("login-error-popup");

    if (!overlay || !popup) return;

    overlay.classList.remove("hide");
    popup.classList.remove("hide");
    overlay.classList.add("show");
    popup.classList.add("show");
}

// Fungsi menutup popup login error
function closeLoginError() {
    const overlay = document.getElementById("login-error-overlay");
    const popup = document.getElementById("login-error-popup");

    if (!overlay || !popup) return;

    overlay.classList.remove("show");
    popup.classList.remove("show");
    overlay.classList.add("hide");
    popup.classList.add("hide");
}

// Fungsi login (khusus halaman index.html)
if (window.location.pathname.includes("index.html")) {
    function login() {
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        if (!usernameInput || !passwordInput) return;

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // ❗Note: Untuk jangka panjang, ganti ke validasi backend
        if (username === "admin" && password === "Notaris@1992") {
            window.location.href = "pages/notaris.html"; // Login sukses
        } else {
            showLoginError(); // Tampilkan popup error
        }
    }

    window.login = login;
    window.closeLoginError = closeLoginError;
}



// ===========================
// Fungsi untuk halaman notaris.html
// ===========================
if (window.location.href.includes("notaris.html")) {
    console.log("✅ notaris.html terdeteksi");

    // Data dummy sementara (simulasi backend)
    const dataPelayanan = [
        {
            nik: "5108056706720002",
            nama: "Orang A",
            tanggal: "2025-03-02",
            status: "Pelayanan Telah Diproses",
            tambahan: "Proses BPN"
        },
        {
            nik: "5108056706720003",
            nama: "Orang B",
            tanggal: "2025-02-27",
            status: "Pelayanan Telah Selesai",
            tambahan: ""
        }
    ];

    // Fungsi menampilkan daftar berkas
    function tampilkanDaftarBerkas() {
        const container = document.getElementById("daftarBerkas");
        container.innerHTML = "";

        dataPelayanan.forEach((berkas, index) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("berkas");

            const isi = `
            <p><strong>Kode:</strong> ${sanitizeText(berkas.nik)}
            <button class="ellipsis-button" onclick="toggleOptionMenu(event, ${index})">⋮</button></p>        
                <p><strong>Status:</strong> ${sanitizeText(berkas.status)}</p>
                ${berkas.status !== "Pelayanan Telah Selesai" && berkas.tambahan ? `<p>${sanitizeText(berkas.tambahan)}</p>` : ""}
            `;

            wrapper.innerHTML = isi;
            container.appendChild(wrapper);
        });
    }

    // Fungsi menampilkan form popup
    window.showFormPopup = function () {
        document.getElementById("form-overlay").classList.remove("hide");
        document.getElementById("form-popup").classList.remove("hide");
        setTimeout(() => {
            document.getElementById("form-overlay").classList.add("show");
            document.getElementById("form-popup").classList.add("show");
        }, 10);
    };

    // Fungsi menutup form popup
    window.closeFormPopup = function () {
        document.getElementById("form-overlay").classList.remove("show");
        document.getElementById("form-popup").classList.remove("show");
        setTimeout(() => {
            document.getElementById("form-overlay").classList.add("hide");
            document.getElementById("form-popup").classList.add("hide");
        }, 500);
    };

    // Fungsi kirim form tambah berkas (sementara push ke array)
    window.submitBerkas = function (e) {
        e.preventDefault();
        const nik = document.getElementById("nik").value.trim();
        const nama = document.getElementById("nama").value.trim();
        const tanggal = document.getElementById("tanggal").value;
        const status = document.getElementById("status").value;
        const tambahan = document.getElementById("tambahan").value.trim();

        if (!/^\d{16}$/.test(nik)) {
            alert("NIK harus 16 digit angka.");
            return;
        }

        const dataBaru = { nik, nama, tanggal, status, tambahan };
        dataPelayanan.push(dataBaru);
        tampilkanDaftarBerkas();
        closeFormPopup();
        e.target.reset();
    };

    // Fungsi menampilkan popup "..." (sementara dummy)
    window.toggleOptionMenu = function (event, index) {
        const popup = document.getElementById("option-popup");
        popup.innerHTML = "";

        const data = dataPelayanan[index];

        const menu = document.createElement("div");
        menu.innerHTML = `
            ${data.status !== "Pelayanan Telah Selesai" ? `
                <button onclick="editBerkas(${index})">Edit</button>
                <button onclick="updateStatus(${index})">Update</button>
            ` : ""}
            <button onclick="deleteBerkas(${index})">Delete</button>
        `;
        popup.appendChild(menu);

        popup.style.left = `${event.pageX}px`;
        popup.style.top = `${event.pageY}px`;
        popup.classList.add("show");

        // Tutup saat klik di luar
        document.addEventListener("click", function klikLuar(e) {
            if (!popup.contains(e.target)) {
                popup.classList.remove("show");
                document.removeEventListener("click", klikLuar);
            }
        }, { once: true });

        event.stopPropagation();
    };

    // Fungsi dummy Edit
    window.editBerkas = function (index) {
        alert("🔧 Fitur edit belum aktif.\nIndex data: " + index);
    };

    // Fungsi dummy Update status
    window.updateStatus = function (index) {
        dataPelayanan[index].status = "Pelayanan Telah Selesai";
        dataPelayanan[index].tambahan = "";
        tampilkanDaftarBerkas();
    };

    // Fungsi Delete
    window.deleteBerkas = function (index) {
        if (confirm("Apakah Anda yakin ingin menghapus berkas ini?")) {
            dataPelayanan.splice(index, 1);
            tampilkanDaftarBerkas();
        }
    };

    // Tampilkan saat halaman dimuat
    tampilkanDaftarBerkas();
}

// Reuse: Fungsi sanitasi
function sanitizeText(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
