export class Form {
    constructor(formSelector) {
        this.forms = document.querySelectorAll(formSelector);
        this.inputs = document.querySelectorAll('input');
        this.URL = 'https://testing-web-server.onrender.com/api/data';
        this.message = { 
            loading: 'Uploading...',
            success: 'Form uploaded',
            failure: 'Something went wrong :('
        };  
    }
    initMask() {
        const setCursorPosition = (position, element) => {
            element.setSelectionRange(position, position);
        }  
        const createMask = (e) => {
            const phoneMask = "+1 (___) ___-____";
            let val;
            let i = 0; 
            const target = e.target;
            val = target.value.replace(/\D/g, '')
            if (1 >= val.length) {
                val = 1;  
            }
            target.value = phoneMask.replace(/./g, (a) => {
                return  /[_\d]/.test(a) && i < val.length
                        ? val.charAt(i++)
                        : i >= val.length
                        ? ''
                        : a
            });

            if ((event.type === 'input')) {
                if (target.value.length == 2) {
                    target.value = ''; 
                } else {
                    setCursorPosition(target.value.length, target)
                }
            };
        };
        const inputs = document.querySelectorAll('[name="phone"]');
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);  
            input.addEventListener('blur', createMask);   
        })
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
        const regOnlyLetAndNum = /[^A-Z a-z 0-9 @ .]/
        mailInputs.forEach(mailInput => {
            mailInput.addEventListener('keydown', (e) => {
                if ((e.key.match(regOnlyLetAndNum) && (e.key != ('Backspace')) && (!e.metaKey))) {
                    e.preventDefault();
                };
            });
        });
    };

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    };

    formDataToJSON(formData) {
        const object = {};
        formData.forEach((value, key) => object[key] = value);
        const json = JSON.stringify(object);
        return json;  
    }
   

    async postData(url, data) {
        const result = await fetch(url, {
            method: "POST",
            body: data,
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        return await result;
    };


    init() {
        this.initMask();
        this.checkMailInputs();
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 1rem;
                    color: white;
                    background: black;
                    border-radius: 5px;
                    width: fit-content;
                    padding: 7px 10px;
                `;
                form.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.message.loading;
                const formData = new FormData(form)
                this.postData(this.URL, this.formDataToJSON(formData))
                    .then (result => {
                        console.log({ result });
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => statusMessage.textContent = this.message.failure)
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
        });
    };
};