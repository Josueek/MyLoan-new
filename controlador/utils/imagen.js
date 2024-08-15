function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const uploadText = document.getElementById('uploadText');
    
    const reader = new FileReader();
    reader.onload = function() {
        const imgElement = document.createElement('img');
        imgElement.src = reader.result;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.borderRadius = '50%';
        
        // Clear previous content
        imagePreview.innerHTML = '';
        
        // Add new image
        imagePreview.appendChild(imgElement);
    };
    
    reader.readAsDataURL(event.target.files[0]);
}
