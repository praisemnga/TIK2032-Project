<?php
require_once '../config/database.php';
require_once '../models/Article.php';

$database = new Database();
$db = $database->getConnection();
$article = new Article($db);

// Handle form submission
if($_POST) {
    if(isset($_POST['create'])) {
        $article->title = $_POST['title'];
        $article->category = $_POST['category'];
        $article->content = $_POST['content'];
        $article->author = $_POST['author'];
        $article->status = $_POST['status'];
        
        if($article->create()) {
            $message = "Artikel berhasil ditambahkan!";
        } else {
            $message = "Gagal menambahkan artikel.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Kelola Artikel</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        textarea { height: 200px; }
        button { background-color: hsl(343, 100%, 40%); color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background-color: hsl(343, 100%, 35%); }
        .message { padding: 10px; margin-bottom: 20px; border-radius: 4px; background-color: #d4edda; color: #155724; }
    </style>
</head>
<body>
    <h1>Kelola Artikel Blog</h1>
    
    <?php if(isset($message)) echo "<div class='message'>$message</div>"; ?>
    
    <form method="POST">
        <div class="form-group">
            <label for="title">Judul Artikel:</label>
            <input type="text" id="title" name="title" required>
        </div>
        
        <div class="form-group">
            <label for="category">Kategori:</label>
            <select id="category" name="category" required>
                <option value="">Pilih Kategori</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Seni">Seni</option>
                <option value="Olahraga">Olahraga</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="author">Penulis:</label>
            <input type="text" id="author" name="author" value="Admin" required>
        </div>
        
        <div class="form-group">
            <label for="status">Status:</label>
            <select id="status" name="status" required>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="content">Konten Artikel:</label>
            <textarea id="content" name="content" placeholder="Gunakan HTML tags untuk formatting..." required></textarea>
        </div>
        
        <button type="submit" name="create">Tambah Artikel</button>
    </form>
    
    <br>
    <a href="../blog.php">← Kembali ke Blog</a>
</body>
</html>