function previewImage(event) {
    let file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        let reader = new FileReader();
        reader.onload = function() {
            let output = document.getElementById('imagePreview');
            output.style.backgroundImage = 'url(' + reader.result + ')';
            output.style.backgroundSize = 'cover';
            output.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
    } else {
        // Limpia la vista previa si no es una imagen
        document.getElementById('imagePreview').style.backgroundImage = 'none';
    }
}
