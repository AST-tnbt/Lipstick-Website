const mobileNav = document.getElementById("mobile-navbar");
const menuIcon = document.getElementById("menu-icon");
const app = document.getElementById("app");
const modeBtn = document.getElementById("mode-btn");
const searchBar = document.getElementsByClassName("search-bar");
let chooseIcon = false;
let lightMode = true;


function handleNavMenu() {
    chooseIcon = !chooseIcon;
    if (chooseIcon) {
        mobileNav.style.display = "block";
        menuIcon.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        mobileNav.style.animation = "scrollDown .3s ease-in";
    }
    else {
        mobileNav.style.display = "none";
        menuIcon.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    }
}
const inputBar = document.getElementById("input-bar");
function responsive(screenSize) {
    if (screenSize <=700 ) {
        inputBar.placeholder = "Tìm kiếm";
        searchBar.style.width= "60%";
    }
    else {
        inputBar.placeholder = "Tìm kiếm sản phẩm";
        searchBar.style.width= "40%";
    }
}
window.addEventListener("resize", () => {
    responsive(window.innerWidth);
});

function changeMode() {
    const searchBar = document.getElementById("search-bar");
    const rootStyles = document.documentElement.style;
    lightMode = !lightMode;
    if (lightMode) {
        app.style.backgroundColor = "#fff";
        modeBtn.style.backgroundColor = "#2D2D30";
        rootStyles.setProperty("--primary-color", "#e3026f");
        rootStyles.setProperty("--text-color", "#333"); 
        searchBar.style.border = "solid 3px var(--secondary-color)";
        modalBox.style.backgroundColor = "#fff";
    }
    else {
        app.style.backgroundColor = "#2D2D30";
        modeBtn.style.backgroundColor = "#fff";
        rootStyles.setProperty("--primary-color", "#e3026f");
        rootStyles.setProperty("--text-color", "#fff");
        searchBar.style.border = "solid 3px var(--white-color)";
        modalBox.style.backgroundColor = "var(--dark-color)";
        overlay.style.opacity = "0.4";
    }
}

function changeImg(productImg, product) {
    product.style.backgroundImage = `url('${productImg}')`;
}

const productSection = document.getElementById("product-section");
function updateProductDisplay(productArray) {
    var productsHTML;
    if (productArray.length === 0) {
        productsHTML = `
        <span class="announce-text">Không tìm thấy sản phẩm :(</span>
        `;
    }
    else {
        productsHTML = productArray.map((product) => `
            <div class="col c-4 c-6 c-12">
                <div class="product-item">
                    <div class="product-img" id="${product.id}" style="background-image: url('${product.imgLink}');"></div>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-footer">
                        <span class="product-price">${product.price}</span>
                        <span class="product-auth">${product.auth}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    productSection.innerHTML = productsHTML;

    const productItems = productSection.querySelectorAll('.product-item');
    productItems.forEach((item, i) => {
        item.addEventListener('mouseover', () => changeImg(productArray[i].demoLink, item.querySelector('.product-img')));
        item.addEventListener('mouseout', () => changeImg(productArray[i].imgLink, item.querySelector('.product-img')));
        item.addEventListener('click', () => openModalBox(productArray[i]));
    });
}

updateProductDisplay(products);

const inputSearch = document.getElementById("input-bar");
inputSearch.addEventListener("input", () => {
    const productSearch = inputSearch.value.trim().toLowerCase();
    const productsAfterSearch = products.filter((product) => product.title.toLowerCase().includes(productSearch));
    updateProductDisplay(productsAfterSearch); 
});

const overlay = document.getElementById("modal-overlay");
const modalBox = document.getElementById("modal-box");
function hideModal() {
    overlay.style.display = "none";
    modalBox.style.display = "none";
}

function changeDemoImg(imgChange) {
    const demoImg = document.getElementById("modal-demo-img");
    demoImg.style.backgroundImage = `url('${imgChange}')`;
}

function openModalBox(productItem) {
    overlay.style.display = "block";
    modalBox.style.display = "block";
    modalBox.innerHTML = `
        <i class="fa-solid fa-circle-xmark close-icon" onclick="hideModal()"></i>
        <div class="modal__product-img">
            <div class="modal__product-img__img" id="modal-demo-img" style="background-image: url('${productItem.imgLink}');">
                <i class="fa-solid fa-chevron-left control-icon" onclick="changeDemoImg('${productItem.imgLink}')"></i>
                <i class="fa-solid fa-chevron-right control-icon" onclick="changeDemoImg('${productItem.demoLink}')"></i>
            </div>
        </div>
        <h2 class="modal__product-title">
            ${productItem.title}
        </h2>
        <h3 class="modal__product-price">
            ${productItem.price}
        </h3>
        <p class="modal__product-content">
            ${productItem.content}
        </p>
        <a class="modal__btn" href="https://www.facebook.com/messages/t/100069438736735" target="_blank">
            ORDER BY MESSENGER
        </a>
    `;

}