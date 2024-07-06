const data = [
    { title: "Apple", price: 10 },
    { title: "Banana", price: 12 },
    { title: "Cherry", price: 9 },
    { title: "Mango", price: 3 },
    { title: "Strawberries", price: 11 },
    { title: "Pineapple", price: 16 },
    { title: "Grape", price: 18 },
    { title: "Orange", price: 17 },
    { title: "Lemon", price: 19 },
    { title: "Kiwi", price: 20 },
]

let sorted = data.sort((a, b) => {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
});

const card = document.querySelector(".card")

sorted.forEach((item) => {
    card.innerHTML += `
            <div class="cards">
                <figure></figure>
                <h1>${item.title}</h1>
                <h2>$${item.price}</h2>
            </div>
    `
})


const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    let sort = quickSort(data.map(x => x.title))
    let res = binarySearch(sort, form.search.value)
    e.preventDefault()
    card.innerHTML = `
            <div class="cards">
                <figure></figure>
                <h1>${sorted[res].title}</h1>
                <h2>$${sorted[res].price}</h2>
            </div>
    `
})
function quickSort(arr) {
    if (arr.length <= 1) return arr

    const pivot = arr[Math.floor(arr.length / 2)]
    const left = arr.filter(x => x < pivot)
    const middle = arr.filter(x => x === pivot)
    const right = arr.filter(x => x > pivot)

    return [...quickSort(left), ...middle, ...quickSort(right)]
}

function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1

    let mid = Math.floor((left + right) / 2)

    if (typeof target === "string") {
        if (arr[mid].toLowerCase() === target.toLowerCase()) {
            return mid
        } else if (arr[mid].toLowerCase() < target.toLowerCase()) {
            return binarySearch(arr, target, mid + 1, right)
        } else {
            return binarySearch(arr, target, left, mid - 1)
        }
    }
}

const modal = document.querySelector(".modal")

const cards = card.querySelectorAll(".cards")

class AddToCartQueue {
    constructor() {
        this.res = []
    }
    addElement(item) {
        this.res.push(item)
    }
    removeItem() {
        if (this.res.length >= 1) {
            this.res.pop()
        }
    }
}

const addToCartQueue = new AddToCartQueue()


cards.forEach((card) => {
    card.addEventListener("click", () => {
        addToCartQueue.addElement(card)
        const cartItems = addToCartQueue.res.map(x => {
            return `
            <input type="button" id="close" value="X" class="fas fa-xmark">
            <div id="cards">
            ${x.outerHTML}
            <button>
                <span>Add to Cart</span>
                <i class="fa-solid fa-cart-shopping" ></i>
            </button>
            </div>`
        }).join("")
        modal.innerHTML = cartItems
        modal.style.display = "flex"
        document.querySelector("#close").addEventListener("click", () => {
            modal.style.display = "none"
            addToCartQueue.removeItem()
        })
    })
})
