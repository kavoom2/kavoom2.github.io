---

title: 자료구조(Data Structure) - Linked List, Hash Table

excerpt: "연결 리스트와 해시 테이블의 개념, 코드로 구현한 자료구조"

classes: wide

  

last_modified_at: 2021-01-20T23:00:00

use_math: true

categories:
- Javascript
tags:
- Data Structure
---
출처에 표기한 글을 정리한 내용입니다.

CPU, 메모리(RAM), 스토리지(HDD, SSD)는 컴퓨터의 주요 부품이다. 메모리는 처리속도가 매우 빠르지만 용량이 매우 적다. 저장된 데이터는 휘발성이 있어, 전기 공급이 중단되면 데이터 또한 사라지게 된다. 따라서, 데이터는 평상시 스토리지에 저장되어 있다. 스토리지는 처리속도가 매우 느리므로 CPU와 함께 일을 하기 힘들다. 따라서, 어떤 프로그램을 실행하면 필요한 자료와 프로그램은 메모리로 옮겨와서 CPU와 작업을 하게 된다.    

자료구조에는 다양한 형태가 있으며, 다음에 언급할 연결리스트는 배열과 장, 단점이 명확히 비교된다. 각 자료구조의 장단점을 이해하고, 상황에 맞는 자료구조를 선택할 수 있는 안목을 기르자.    
## 1. 연결리스트(Linked List)
연결 리스트는 노드(node)로 구성되어 있다. 노드는 실제값(Data field)과 다음 노드의 주소값(Pointer)을 가지고 있어야 한다. 연결 리스트는 노드와 노드를 연결하는 방식으로 구현된다.     

연결리스트는 자료를 탐색하거나 변경하려면 배열 구조에 비해 더 많은 계산이 소요된다. 시간복잡도가 $O(n)$으로, 이를 보완하고자 Tail과 Head를 이은 이중연결 리스트 방식이 고안되었다.
```js
class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }
    addToTail(value) {
        const node = new Nodw(value);
        if ( this.size === 0 ) {
            this.head = node;
            this.tail = node;
            this._size += 1;
        } else {
            this.tail.next = node;
            this.tail = node;
            this._size += 1;
        }
    }

    remove(value) {
        if ( this._size === 0 ) {
            return undefined;
        } else if ( this._size === 1 ) {
            if ( this.head.value === value ) {
                this.head === null;
                this.tail === null;
                this._size -= 1;
            }
            return;
        }
        let targetNode = this.head;
        if ( targetNode.value === value ) {
            this.head = targetNode.next;
            this._size -= 1;
            return;
        }
        while ( targetNode.next.next !== nul ) {
            if ( targetNode.next.value === value ) {
                targetNode.next = targetNode.next.next;
                this._size -= 1;
                break;
            }
            targetNode = targetNode.next;
        }
    }

    getNodeAt(index) {
        if ( index > this._size ) {
            return undefined;
        }
        let count = 0;
        let curNode = this.head;
        while ( count !== index ) {
            curNode = curNode.next;
            count += 1;
        }
        return curNode;
    }

    contains(value) {
        let result = false;
        let curNode = this.head;
        while ( curNode.next !== null ) {
            if ( curNode.value === value ) {
                result = true;
                break;
            }
            curNode = curNode.next;
        }
        return result;
    }

    indexOf(value) {
        let count = 0;
        let curNode = this.head;
        while ( curNode !== null ) {
            if ( curNode.value === value ) {
                return count;
            }
            curNode = curNode.next;
            count += 1;
        }
        return -1;
    }

    size() {
        return this._size;
    }
}
````

## 2. 해시 테이블(Hash Table)
해싱(Hashing)이란 임의의 길이값을 해시함수(Hash function)을 사용하여 정해진 값으로 변환하는 작업이다. 데이터의 암호화 작업에 주로 활용되고 있다. 해싱은 자료구조에도 적용할 수 있는데, 이 해싱함수를 이용해 데이터를 저장한 구조를 해시 테이블(Hash table)이라고 한다.

해시테이블은 데이터를 받으면 해시함수를 사용하여 변환한 값을 색인(index)으로 설정한다. 색인(index)를 객체의 키(key)로, 데이터를 값(value)로 저장하게 된다. 

해시테이블에서 중요한 개념은 적재율(Load Factor)와 충돌(Collision)이다. 적재율은 $K/N$($K는 키의 갯수, N은 테이블의 크기$)이다. 적재율이 1 이상이면 필연적으로 충돌이 발생한다. 그리고, 데이터들의 색인 분포가 한 쪽으로 몰리면, 하나의 색인에 수많은 데이터가 몰릴 수 있다. 이는 데이터 탐색의 이점을 살리려는 해시 테이블의 목적과는 거리가 멀다.

먼저, 충돌이 발생하여 같은 색인에 두 개 이상의 자료가 들어가야 하는 상황은 어떻게 해결할 수 있을까. 체이닝(Chaining)은 충돌이 발생하면, 데이터를 동일한 버켓(Bucket)에 저장하고 연결리스트 방식으로로 저장하는 개념이다. 


```js
const hashFunction = function(str, max) {
    let hash = 0;
    for ( let i = 0; i < str.length; i++ ) {
        hash = (hash <<5) + str.charCodeAt(i) // 비트연산자 
        hash &= hash; // ( hash = hash + hash)
        hash = Math.abs(hash);
    }
    return hash % max;
}

class HashTable {
    constructor() {
        this._size = 0;
        this._bucketNum = 8;
        this._storage = LimitedArray(this._bucketNum);
    }

    insert(key, value) {
        // Insertion
        const index = hashFunction(key, this._bucketNum);
        let obj;
        let insertData = {};
        if ( this._storage.get(index) === undefined ) {
            obj = {};
        } else {
            obj = this._storage.get(index);
        }
        let result = Object.assgin(obj, insertData);
        this._storage.set(index, result);
        this._size += 1;

        // Resize
        let percentage = ( this._size / this._bucketNum ) * 100;
        if ( percentage > 75) {
            this._bucketNum *= 2;
        } else if ( percentage < 25 ) {
            this._bucketNum /= 2;
        } else {
            return;
        }
        this._resize(this._bucketNum);
    }

    retrieve(key) {
        const index = hasFunction(key, this._bucketNum);
        const obj = this._storage.get(index);
        if ( obj === undefined ) {
            return undefined;
        }
        return obj[key];
    }


    remove(key) {
        // Remove
        const index = hasFunction(key, thos._bucketNum);
        const data = this._storage.get(index);
        if ( data === undefined ) {
            return;
        }

        const result = {};
        let count = 0;
        for ( let prop in data ) {
            if ( prop !== key ) {
                result[prop] = data[prop];
                count ++
            }
        }
        if ( count === 0 ) {
            this._storage.set(index, undefined);
        } else {
            this._storage.set(index, result);
        }
        this._size -= 1;

        // Resize
        let percentage = (this._size / this._bucketNum) * 100;
        if ( percentage > 75 ) {
            this._bucketNum *= 2;
        } else if ( percentage < 25 ) {
            this.bucketNum /= 2;
        } else {
            return;
        }
        this._resize(this._bucketNum);
    }

    _resize(newBucketNum) {
        // Backup current storage
        const backUp = [];
        this._storage.each( (data) => {
            if ( data !== undefined ) {
                for ( let key in data ) {
                    let obj = {};
                    obj[key] = data[key];
                    backUp.push(obj);
                }
            }
        });

        // Resize current storage
        this._storage = LimitedArray(newBucketNum);
        for ( let data of backUp ) {
            for ( let key in data ) {
                cosnt index = hashFunction(key, newBucketNum);
                let obj;
                let insertData ={};
                insertData[key] = data[key];

                if ( this._storage.get(index) === undefined ) {
                    obj = {};
                } else {
                    obj = this._storage.get(index);
                }
                let result = Object.assign(obj, insertData);
                this._storage.set(index, result);
            }
        }
    }
}


````

## 3. Refernece

[Data Structure(자료구조) -Linked List](https://opentutorials.org/module/1335/8821)    
[해싱, 해시함수, 해시테이블](https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash/)    
[[자료구조] 해시 테이블(Hash Table)](https://baeharam.github.io/posts/data-structure/hash-table/)    