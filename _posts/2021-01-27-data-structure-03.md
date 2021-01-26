---

title: 자료구조(Data Structure) - Tree, Binary search tree

excerpt: "트리의 개념, 코드로 구현한 자료구조"

classes: wide

  

last_modified_at: 2021-01-27T00:00:00

use_math: true

categories:
- Data Structure
tags:
- tree
- binary search tree
---
## 1. 트리(Tree) 
먼저 트리의 구성요소를 살펴보도록 하자.
> 노드(Node): 데이터가 담기는 공간. 도식 상에서는 점으로 표시한다.    
>      
> 엣지(Edge): 노드와 노드 사이를 연결한 선. 노드 사이의 관계를 나타낸다.
>      
> 높이(Height): 최상단에 위치한 루트노드(root)를 기준으로 최하단에 위치한 노트에 이르는 가장 경로 중 가장 긴 경로이다.  
>      
> 레벨(Level): 루트 노트를 기준으로 해당 노드가 어떤 깊이에 있는지 나타낸다. 가령, 루트노트의 자식노드들은 레벨(또는 깊이)가 1이다.

트리의 구조 중 대표적인 것이 이진트리이다. 이진트리는 자식노드의 최대 갯수가 2개인 것이 특징이다. 이진트리는 정이진트리, 완전이진트리, 균형이진트리 등이 있다.

> 정이진트리(Full binary tree)는 잎새노드를 제외한 모든 레벨에서 노드가 자식노드를 가지고 있는 구조.
>    
> 완전이진트리(Complete binary tree)는 마지막 레벨을 제외한 모든 레벨에서 노드들이 꽉 차있는 구조.     

트리의 각 노도들을 탐색하는 방법을 트리순회(Tree traversal)이라고 한다. 중복과 누락되는 노드가 없이 탐색해야 하는데, 대표적인 순회방법에는 전위순회(Preorder), 중위순회(Inorder), 후위순회(Postorder)가 있다. 

> 전위순회(Preorder): 노드 - 좌측노드 - 우측노드    
> 1. 노드를 탐색한다.
> 2. 좌측 서브트리를 전위순회한다.
> 3. 우측 서브트리를 전위순회한다.     
> 깊이 우선탐색에 사용된다.


> 중위순회(Inorder): 좌측노드 - 노드 - 우측노드
> 1. 좌측 서브트리를 중위순회한다.
> 2. 노드를 탐색한다. 
> 3. 우측 서브트리를 중위순회한다.

> 후위순회(Postorder): 좌측노드 - 우측노드 - 노드
> 1. 좌측 서브트리를 후위순회한다.
> 2. 우측 서브트리를 후위순회한다.
> 3. 노드를 탐색한다.
> 

```js
class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    insertNode(value) {
        const node = new TreeNode(value);
        this.children.push(node);
    }

    contains(value) {
        if ( this.value === value ) return true;
        else {
            for (let child of this.children ) {
                if ( child.contains(value) ) return true
            }
        }
        return false;
    }
}
````

## 2. 이진탐색트리(Binary Search Tree)
이진탐색과 연결리스트가 결합한 자료구조 형태. 연결리스트는 자료의 추가와 삭제가 $O(1)$이 소요되지만, 자료 탐색에는 $O(n)$이 소요된다. 이를 해결하고자 시간복잡도가 $O(n)$인 이진탐색 방식을 결합한 것.     

이진탐색트리에는 정해진 규칙이 있다. 부모노드보다 큰 값은 우측에, 더 작은 값은 좌측에 배치한다. 중복된 값을 갖는 노드는 존재하지 않는다.

이진탐색트리를 순회할 때에는 중위순회(Inorder) 방식을 사용한다. 다음 예제를 살펴보도록 하자.
```js
class BinarySearchTreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        const node = new BinarySearchTreeNode(value);
        if ( value < this.value ) {
            // value < this.value
            if ( this.left === null ) {
                this.left = node;
                return;
            } else this.left.insert(value);
        } else if {
            // value > this.value
            if ( this.right === null ) {
                this.right = node;
                return;
            } else this.right.insert(value);
            // value === this.value
        } else return undefined;
    }

    contains(value) {
        if ( value === this.value ) return true;
        else if ( value < this.value ) return !!(this.left && this.left.contains(value));
        else if ( value > this.value ) return !!(this.right && this.right.contains(value));
    }

    inorder(callback) {
        // 중위순회는 좌측 - 중앙 - 우측노드 순서로 탐색 및 실행한다.
        if ( this.left ) this.left.inorder(callback);
        callback(this.value);
        if ( this.right ) this.right.inorder(callback);
    }
}
````

## 3. Refernece
[트리(tree)와 이진트리(binary tree)](https://ratsgo.github.io/data%20structure&algorithm/2017/10/21/tree/)    
[이진탐색트리(Binary Search Tree)](https://ratsgo.github.io/data%20structure&algorithm/2017/10/22/bst)    