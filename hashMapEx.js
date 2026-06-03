class HashMap {
    constructor () {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.capacity;
    } 

    set(key, value) {
        let hashCode = this.hash(key);
        if (this.buckets[hashCode] === undefined) {
            this.buckets[hashCode] = [];
        }

        for (let pair of this.buckets[hashCode]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        
        this.buckets[hashCode].push([key, value]);
    }

    get(key) {
        const bucket = this.getBucket(key);

        if (bucket === undefined) {
            return null;
        } 
        for (let pair of bucket) {
            if(pair[0] === key) {
                return pair[1];
            }
        }
        return null;
    }

    has(key) {
        const bucket = this.getBucket(key);

        if (bucket === undefined) {
            return false;
        }

        for (let pair of bucket) {
            if (pair[0] === key) {
                return true;
            }
        }
        return false;
    }
 
    remove(key) {
        const bucket = this.getBucket(key);

        if (bucket === undefined) {
            return false;
        }

        for (let i = 0; i < bucket.length; i++) {
            const pair = bucket[i];

            if (pair[0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    length() {
        let counter = 0;

        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];

            if (bucket !== undefined){
                counter += bucket.length;
            }
        }

        return counter;
    }

    clear() {
        this.buckets = new Array(this.capacity);
    }

    getBucket(key) {
        let hashCode = this.hash(key);
        let bucket = this.buckets[hashCode];
    }
}