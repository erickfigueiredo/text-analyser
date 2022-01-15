Vue.createApp({
    data() {
        return {
            userText: '',
            amountChar: 0,
            amountWords: 0,
            amountLines: 1,
            amountSentences: 0,
            amountParagraphs: 1,
            readingTime: '0s',
        };
    },
    watch: {
        userText() {
            this.amountChar = this.userText?.length || 0;
            this.amountWords = this.userText.match(/\w+(-\w+)*/g)?.length || 0;
            this.amountLines = this.userText.match(/\n/g)?.length + 1 || 1;
            this.amountSentences = this.userText.match(/\w+(-\w+)*(\s|\w+(-\w+)*|\,)[?!.;]/g)?.length || 0;
            this.amountParagraphs = this.userText.match(/\n\w/g)?.length || 1;

            this.calcReadingRate();
        }
    },
    methods: {
        calcReadingRate() {
            const timeInSec = Math.round((this.amountWords * 60) / 200);

            let result = '';
            const h = Math.floor(timeInSec / 3600);
            if(h) result = `${h}h `;

            const aux = timeInSec % 3600;
            const m = Math.floor(aux / 60);
            if(m) result += `${m}m `;
            
            const s = Math.floor((aux % 3600) % 60);
            if(s || !result.length) result += `${s}s`;

            this.readingTime = result;
        }
    },
}).mount('#app');
