// Mock Data for Trending Models
const modelsData = [
    {
        id: 1,
        title: "model 1",
        author: "model vault",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        downloads: "2.4k",
        likes: "856",
        formats: [".SKP", ".OBJ"],
        isPremium: false,
        fileUrl: "models/model_1.skp" // Add your actual file paths here
    },
    {
        id: 2,
        title: "Cyberpunk City Block",
        author: "Neo Tokyo Labs",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        thumbnail: "https://images.unsplash.com/photo-1515630278258-407f66498911?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        downloads: "8.1k",
        likes: "3.2k",
        formats: [".FBX", ".BLEND"],
        isPremium: false,
        fileUrl: "models/cyberpunk_block.zip" // Add your actual file paths here
    },
    {
        id: 3,
        title: "Minimalist Leather Sofa",
        author: "Furniture 3D",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        downloads: "12k",
        likes: "1.1k",
        formats: [".SKP", ".FBX"],
        isPremium: false,
        fileUrl: "models/leather_sofa.zip" // Add your actual file paths here
    },
    {
        id: 4,
        title: "Concept Sci-Fi Vehicle",
        author: "Max Render",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        thumbnail: "https://images.unsplash.com/photo-1551041777-ed277b8dd348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        downloads: "3.5k",
        likes: "920",
        formats: [".BLEND", ".OBJ"],
        isPremium: false,
        fileUrl: "models/sci_fi_vehicle.zip" // Add your actual file paths here
    }
];

// DOM Elements
const modelsGrid = document.getElementById('models-grid');
const searchBtn = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const closeSearch = document.getElementById('close-search');
const navbar = document.getElementById('navbar');
const dropzone = document.getElementById('dropzone');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderModels();
    setupEventListeners();
});

// Render Models to Grid
function renderModels() {
    if (!modelsGrid) return;
    
    modelsGrid.innerHTML = modelsData.map((model, index) => `
        <div class="group bg-dark-800 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-primary/10 animate-fade-in-up" style="animation-delay: ${index * 0.1}s">
            
            <!-- Thumbnail relative container -->
            <div class="relative aspect-[4/3] overflow-hidden bg-dark-900 cursor-pointer">
                <img src="${model.thumbnail}" alt="${model.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                
                <!-- Overlay Gradients & Badges -->
                <div class="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div class="absolute top-4 right-4 flex gap-2">
                    ${model.isPremium ? '<span class="px-2 py-1 rounded bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg"><i class="ph-fill ph-crown"></i> PRO</span>' : '<span class="px-2 py-1 rounded bg-dark-900/80 backdrop-blur border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider">FREE</span>'}
                </div>
                
                <!-- Quick Download Button Overlay -->
                <button onclick="downloadModel(${model.id})" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-110">
                    <i class="ph ph-download-simple text-xl"></i>
                </button>
            </div>
            
            <!-- Card Content -->
            <div class="p-5">
                <div class="flex gap-2 mb-3">
                    ${model.formats.map(format => `<span class="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">${format}</span>`).join('')}
                </div>
                <h3 class="text-white font-bold text-lg mb-1 truncate group-hover:text-primary transition-colors cursor-pointer">${model.title}</h3>
                
                <!-- Author Info -->
                <div class="flex justify-between items-center mt-4">
                    <div class="flex items-center gap-2 cursor-pointer">
                        <img src="${model.avatar}" class="w-6 h-6 rounded-full object-cover border border-white/20">
                        <span class="text-slate-400 text-sm hover:text-white transition-colors">${model.author}</span>
                    </div>
                    
                    <div class="flex items-center gap-3 text-slate-500 text-sm">
                        <span class="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"><i class="ph ph-heart"></i> ${model.likes}</span>
                        <span class="flex items-center gap-1"><i class="ph ph-download-simple"></i> ${model.downloads}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Global Event Listeners
function setupEventListeners() {
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.replace('bg-dark-900/70', 'bg-dark-900/90');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.replace('bg-dark-900/90', 'bg-dark-900/70');
        }
    });

    // Search Toggle
    if (searchBtn && searchOverlay && closeSearch) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('hidden');
            setTimeout(() => {
                searchOverlay.classList.remove('opacity-0');
                searchOverlay.classList.add('opacity-100');
                searchOverlay.querySelector('input').focus();
            }, 10);
        });

        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('opacity-100');
            searchOverlay.classList.add('opacity-0');
            setTimeout(() => searchOverlay.classList.add('hidden'), 300);
        });
    }

}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    
    toastMsg.textContent = message;
    
    toast.classList.remove('opacity-0', 'translate-y-20');
    toast.classList.add('opacity-100', 'translate-y-0');
    
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-20');
    }, 4000);
}

// Trigger real file download
window.downloadModel = function(modelId) {
    const model = modelsData.find(m => m.id === modelId);
    
    if (!model || !model.fileUrl) {
         showToast(`Error: Download link for "${model?.title || 'Unknown'}" not found!`);
         return;
    }
    
    showToast(`Downloading "${model.title}"... Started!`);
    
    // Create an invisible link to automatically trigger the browser download
    const link = document.createElement('a');
    link.href = model.fileUrl;
    // Extract filename from the URL, or default to title
    link.download = model.fileUrl.split('/').pop() || `${model.title}.zip`;
    
    // Append, Click, and Remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
