export class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.items = items;
        this.oldCounter = 0;
        this.newCounter = 0;
    }
        
    bindTriggers() {
        const plusNewItems = this.newOfficer.querySelector('.plus');
        const plusOldItems = this.oldOfficer.querySelector('.plus');
        plusOldItems.addEventListener('click', () => {
            this.oldCounter = this.showItems(this.oldOfficer, this.oldCounter)
        })
        plusNewItems.addEventListener('click', () => {
            this.newCounter = this.showItems(this.newOfficer, this.newCounter)
        })
    }

    hideItems() {
        this.hideItemsColumn(this.newOfficer);
        this.hideItemsColumn(this.oldOfficer)
    }

    showItems(column, counter) {
        const items = column.querySelectorAll(this.items)
        const item = items[counter];
       
        if (item) {
            item.style.display = "flex";
            item.classList.add('animated', 'fadeInUp');
            counter++;
            if (counter === items.length - 1) {
                items[items.length - 1].remove();
            }
        }
        return counter;
    }

    hideItemsColumn(column) {
        const items = column.querySelectorAll(this.items)    
        items.forEach((item, index, arr) => {
            if (index !== arr.length - 1) {
                item.style.display = 'none'
            }
        });
    }

    init() {
        this.hideItems()
        this.bindTriggers()
    }
}