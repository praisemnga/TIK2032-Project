<?php
error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);
require_once '.vscode/config/database.php';
require_once '.vscode/models/Article.php';

// Inisialisasi database dan artikel
$database = new Database();
$db = $database->getConnection();
$article = new Article($db);

// Ambil parameter untuk filtering
$category_filter = isset($_GET['category']) ? $_GET['category'] : '';
$article_id = isset($_GET['id']) ? $_GET['id'] : '';

// Jika ada ID artikel, tampilkan artikel tunggal
if($article_id) {
    $single_article = new Article($db);
    $article_found = $single_article->getById($article_id);
}

?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Saya - Blog</title>
    <style>
        /* Reset dan styling dasar */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f8f8;
        }
        
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
            margin-bottom: 40px;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
        }
        
        nav ul {
            display: flex;
            list-style: none;
        }
        
        nav ul li {
            margin-left: 20px;
        }
        
        nav ul li a {
            text-decoration: none;
            color: #333;
            font-weight: bold;
            transition: color 0.3s;
        }
        
        nav ul li a:hover {
            color: hsl(343, 100%, 40%);
        }
        
        h1 {
            font-size: 36px;
            margin-bottom: 20px;
            color: hsl(343, 100%, 40%);
        }
        
        h2 {
            font-size: 28px;
            margin-bottom: 15px;
            color: hsl(343, 100%, 40%);
        }
        
        h3 {
            font-size: 22px;
            margin-bottom: 10px;
            color: #333;
        }
        
        p {
            margin-bottom: 15px;
        }
        
        .blog-post {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 40px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .post-meta {
            color: #666;
            font-style: italic;
            margin-bottom: 20px;
        }
        
        .post-content {
            line-height: 1.8;
        }
        
        footer {
            text-align: center;
            padding: 20px 0;
            border-top: 1px solid #ddd;
            margin-top: 40px;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            header {
                flex-direction: column;
            }
            
            nav ul {
                margin-top: 20px;
            }
        }
    </style>
</head>
<body>
    <script src="script.js"></script>
    <header>
        <div class="logo">Portfolio Saya</div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="blog.php">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <h1>Blog</h1>
        
        <article class="blog-post">
            <h2>Perkembangan Teknologi Web Modern</h2>
            <div class="post-meta">Diposting pada: 9 Maret 2025 | Kategori: Teknologi</div>
            <div class="post-content">
                <p>Dunia teknologi web terus berkembang dengan cepat dari tahun ke tahun. Salah satu perkembangan yang paling signifikan dalam beberapa tahun terakhir adalah peningkatan penggunaan Progressive Web Apps (PWA).</p>
                
                <h3>Apa itu Progressive Web Apps?</h3>
                <p>Progressive Web Apps (PWA) adalah aplikasi web yang menggunakan teknologi modern untuk memberikan pengalaman seperti aplikasi native kepada pengguna. PWA dapat diakses melalui browser web tetapi menawarkan fungsi yang biasanya hanya tersedia di aplikasi mobile, seperti kemampuan bekerja offline, notifikasi push, dan akses ke perangkat keras perangkat.</p>
                
                <h3>Keuntungan PWA</h3>
                <p>Beberapa keuntungan utama PWA meliputi:</p>
                <ul>
                    <li>Dapat diakses tanpa instalasi dari app store</li>
                    <li>Responsif dan bekerja di semua perangkat</li>
                    <li>Tidak memerlukan pembaruan manual</li>
                    <li>Menggunakan ruang penyimpanan minimal</li>
                    <li>Dapat berfungsi offline atau dengan koneksi internet yang buruk</li>
                </ul>
                
                <h3>Masa Depan Pengembangan Web</h3>
                <p>Dengan semakin banyaknya perusahaan besar yang mengadopsi PWA, seperti Twitter, Starbucks, dan Pinterest, kita dapat melihat tren yang jelas menuju pengalaman web yang lebih terintegrasi dan mirip aplikasi. Ini menunjukkan bahwa masa depan pengembangan web akan terus mengaburkan batasan antara web dan aplikasi native.</p>
                
                <p>Sebagai pengembang web, penting untuk terus memperbarui keterampilan kita dan tetap mengikuti tren dan teknologi terbaru untuk tetap relevan di industri yang terus berubah ini.</p>
            </div>
        </article>
        
        <article class="blog-post">
            <h2>Seni Digital: Evolusi dan Tren Terkini</h2>
            <div class="post-meta">Diposting pada: 5 Maret 2025 | Kategori: Seni</div>
            <div class="post-content">
                <p>Seni digital telah mengalami evolusi yang luar biasa dalam beberapa dekade terakhir. Dari grafik komputer sederhana hingga kreasi imersif yang kompleks, perjalanan seni digital mencerminkan kemajuan teknologi yang pesat.</p>
                
                <h3>Awal Mula Seni Digital</h3>
                <p>Seni digital mulai muncul pada tahun 1960-an ketika komputer pertama kali digunakan untuk menciptakan karya seni. Seniman seperti Charles Csuri dan Vera Molnár menjadi pelopor dalam menggunakan algoritma dan teknologi untuk menghasilkan karya visual yang inovatif.</p>
                
                <h3>NFT dan Revolusi Seni Digital</h3>
                <p>Salah satu perkembangan paling signifikan dalam seni digital baru-baru ini adalah munculnya Non-Fungible Tokens (NFT). NFT memungkinkan seniman digital untuk menjual karya mereka dengan cara yang belum pernah terjadi sebelumnya, dengan bukti kepemilikan dan keaslian yang terverifikasi di blockchain.</p>
                
                <p>Fenomena NFT telah membuka pintu bagi banyak seniman digital untuk mendapatkan pengakuan dan kompensasi yang layak atas karya mereka. Ini juga telah menciptakan pasar baru yang menarik bagi kolektor dan investor seni.</p>
                
                <h3>Tren Masa Depan</h3>
                <p>Dengan kemajuan teknologi seperti realitas virtual (VR) dan realitas tertambah (AR), masa depan seni digital tampak sangat menjanjikan. Seniman kini dapat menciptakan pengalaman imersif yang memungkinkan penonton untuk berinteraksi dengan karya seni dengan cara yang sebelumnya tidak mungkin.</p>
                
                <p>Seni digital terus mendorong batas-batas kreativitas dan teknologi, menciptakan bentuk ekspresi baru yang menantang pemahaman tradisional kita tentang apa itu seni.</p>
            </div>
        </article>
        
        <article class="blog-post">
            <h2>Olahraga dan Teknologi: Bagaimana Inovasi Mengubah Dunia Olahraga</h2>
            <div class="post-meta">Diposting pada: 28 Februari 2025 | Kategori: Olahraga</div>
            <div class="post-content">
                <p>Dunia olahraga tidak luput dari pengaruh kemajuan teknologi. Dari peralatan yang lebih baik hingga analisis data yang mendalam, teknologi telah mengubah cara atlet berlatih, berkompetisi, dan bahkan cara penggemar menikmati olahraga.</p>
                
                <h3>Wearable Technology</h3>
                <p>Perangkat wearable seperti jam pintar dan sensor fitness telah menjadi alat penting bagi atlet profesional dan amatir. Perangkat ini dapat melacak berbagai metrik seperti detak jantung, kecepatan, jarak, dan bahkan pola tidur, memberikan wawasan berharga untuk meningkatkan performa dan mencegah cedera.</p>
                
                <h3>Analisis Data dan AI</h3>
                <p>Tim olahraga kini menggunakan analisis data canggih dan kecerdasan buatan untuk menganalisis performa, mengidentifikasi pola, dan bahkan memprediksi hasil pertandingan. Teknologi seperti sistem pelacakan pemain dalam sepak bola dan bola basket memberikan data yang dapat digunakan untuk mengoptimalkan strategi dan taktik permainan.</p>
                
                <h3>Teknologi VAR dalam Sepak Bola</h3>
                <p>Video Assistant Referee (VAR) telah menjadi bagian integral dari sepak bola modern. Meskipun kontroversial, teknologi ini bertujuan untuk membantu wasit membuat keputusan yang lebih akurat, mengurangi kesalahan manusia dalam pertandingan penting.</p>
                
                <h3>Masa Depan Olahraga dan Teknologi</h3>
                <p>Dengan kemajuan dalam realitas virtual, kecerdasan buatan, dan robotika, masa depan interaksi antara olahraga dan teknologi tampak menarik. Kita mungkin akan melihat simulasi latihan yang lebih imersif, analisis performa yang lebih mendalam, dan bahkan cara baru untuk penggemar berinteraksi dengan olahraga favorit mereka.</p>
                
                <p>Sementara beberapa tradisionalis mungkin khawatir tentang pengaruh teknologi pada kemurnian olahraga, tidak dapat dipungkiri bahwa inovasi teknologi akan terus membentuk evolusi dunia olahraga di tahun-tahun mendatang.</p>
            </div>
        </article>
    </main>
    
    <footer>
        <p>&copy; 2025 Portfolio Saya. Dibuat dengan HTML5.</p>
    </footer>
</body>
</html>