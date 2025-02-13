const container = document.getElementById("tree-container");
// let sgt = new intervalTree();

const black = "#000000";
const blue = "#023047";
const yellow = "#b8af09";
var a=[] 
var tuples=[]
var root;
const el = document.getElementById('btnFind');

el.addEventListener('click', function handleClick(event) {
  var ans=[];
  let qK = document.getElementById("inpFind").value;
  
  var list=find_intervals(root,qK)
      while(list!=null){
        ans.push(list.key)
        list=list.right
      }
      // console.log(ans)
      var notes=document.getElementById("notes").innerHTML = ans
});
const s = new sigma({
    renderer: {
        container: container,
        type: "canvas"
    },
    settings: {
        minNodeSize: 10,
        maxNodeSize: 20,
        minEdgeSize: 2,
        maxEdgeSize: 2,
        edgeColor: "#000000",
        defaultNodeColor: "#ffb703",
        labelThreshold: 0,
        // rendererEdgeLabels: true
    }
});

s.cameras[0].goTo({ x: 0, y: 0, angle: 0, ratio: 1.2 });
s.refresh();

class ListNode {
        constructor(val) {
          this.key = val;
          this.right = null;
        }
      }
      
      function arrayToList(arr) {
        if (arr.length === 0) {
          return null;
        }
      
        let head = new ListNode(arr[0]);
        let current = head;
      
        for (let i = 1; i < arr.length; i++) {
          current.right = new ListNode(arr[i]);
          current = current.right;
        }
        return head;
      }

function addNode(data, label,pos_x, pos_y) {
    // console.log(data);
    s.graph.addNode({
        id: data,
        label: label,
        x: pos_x,
        y: pos_y,
        size: 10
    });

    s.refresh();
}

function removeNode(id) {
    var edgesToRemove = s.graph.edges().filter(function(edge) {
        return edge.source === id || edge.target === id;
    });

    edgesToRemove.forEach(function(edge) {
        s.graph.dropEdge(edge.id);
    });

    var nodesToRemove = s.graph.nodes(id);

    s.graph.dropNode(nodesToRemove.id);

    s.refresh();
}

function addEdge(from, to) {
    s.graph.addEdge({
        id: `${from}-${to}`,
        source: from,
        target: to
    });

    s.refresh();
}

function insert() { 
    class TreeNode {
        constructor(key) {
          this.key = key; // the value/key stored in the node
          this.left = null; // the left child of the node
          this.right = null; // the right child of the node
          this.rilist=[]
          this.lelist=[]
        }
      }
      
      function make_tree(list) {
        let end, root;
        if (list == null) {
          root = new TreeNode(); // create empty tree
          root.left = root.right = null;
          return root;
        } else if (list.right == null) {
          return list; // one-leaf tree
        } else {
          // nontrivial work required: at least two nodes
          root = end = new TreeNode();
          // convert input list into leaves below new list
          end.left = new TreeNode(list.key);
          end.key = list.key;
          list = list.right;
          end.left.right = null;
          while (list != null) {
            end.right = new TreeNode(list.key);
            end = end.right;
            end.left = new TreeNode(list.key);
            end.key = list.key;
            list = list.right;
            end.left.right = null;
          }
          end.right = null;
          // end creating list of leaves
          let old_list, new_list, tmp1, tmp2;
          old_list = root;
          while (old_list.right != null) {
            // join first two trees from old_list
            tmp1 = old_list;
            tmp2 = old_list.right;
            old_list = old_list.right.right;
            tmp2.right = tmp2.left;
            tmp2.left = tmp1.left;
            tmp1.left = tmp2;
            tmp1.right = null;
            new_list = end = tmp1;
            // new_list started
            while (old_list != null) {
              // not at end
              if (old_list.right == null) {
                // last tree
                end.right = old_list;
                old_list = null;
              } else {
                // join next two trees of old_list
                tmp1 = old_list;
                tmp2 = old_list.right;
                old_list = old_list.right.right;
                tmp2.right = tmp2.left;
                tmp2.left = tmp1.left;
                tmp1.left = tmp2;
                tmp1.right = null;
                end.right = tmp1;
                end = end.right;
              }
            }
            // finished one pass through old_list
            old_list = new_list;
          }
          // end joining pairs of trees together
          root = old_list.left;
          return root;
        }
      }
      
      function traverse(node) {
          if (node) {
            // console.log(node);
            traverse(node.left);
            traverse(node.right);
          }
      }
      function addint(node,interval){
        if (node!=null){
          if(interval[0]>node.key){
            addint(node.right,interval)
          }
          else if (interval[1]<node.key){
            addint(node.left,interval)
          }
          else{
            node.lelist.push(interval[0])
            node.rilist.push(interval[1])
            node.lelist.sort((a,b) => a-b)
            node.rilist.sort((a,b) => a-b).reverse()
          }
        }
      }
      
      var input = document.getElementById("inp").value.trim();
      tuples = input.split(",").map(function (item) {
        var tuple = item.trim().split(" ");
          return [parseInt(tuple[0]), parseInt(tuple[1])];
      });
      tuples.forEach(function (tuple) {
        a.push(parseInt(tuple[0]));
        a.push(parseInt(tuple[1]));
        // a.sort();
        });
      a=new Set(a);
      b=[]
      a.forEach(function (tuple) {
        b.push(tuple);
      });
      b.sort((a,b) => a-b)
      a=b
      console.log(b)
      var arrlist =arrayToList(a);
      root = make_tree(arrlist);
      tuples.forEach(element => {
        addint(root,element);
      });



      printer(root,100,10,0,100);

      function printer(root,x_cord,y_cord,depth,f){
          if(root==null) return;
          // console.log(root.key);
        
          addNode(root.key.toString()+" "+depth.toString(),root.lelist.toString()+" => "+root.key.toString()+" <= "+root.rilist.toString(),x_cord,y_cord);

          if(root.left!=null){
              printer(root.left, x_cord - (f/2), y_cord + (f/2),depth+1,f/2);
              addEdge(root.key.toString()+" "+depth.toString(),root.left.key.toString()+" "+(depth+1).toString(),depth+1);
          }

          if(root.right!=null){
              printer(root.right, x_cord + (f/2), y_cord + (f/2),depth+1,f/2);
              addEdge(root.key.toString()+" "+depth.toString(),root.right.key.toString()+" "+(depth+1).toString(),depth+1);
          }
     }   
}
function changeNodeColor(node_id) {
  s.graph.nodes(node_id).color = black;
  s.refresh();
}

depth = 0;
  function find_intervals(tree, query_key) {
    let current_tree_node;
    let current_list, result_list, new_result;
    if (tree.left == null) {
      return null;
    } 
    else {
      current_tree_node = tree;
      changeNodeColor(current_tree_node.key+" "+depth);
      result_list = null;
      
      while (current_tree_node.right != null) {
        if (query_key < current_tree_node.key) {
          current_list = arrayToList(current_tree_node.lelist);
          while (current_list != null && current_list.key <= query_key) {
            new_result = new ListNode();
            new_result.right = result_list;
            new_result.key = current_list.key;
            result_list = new_result;
            current_list = current_list.right;
          }
          current_tree_node = current_tree_node.left;
          depth+=1;
          changeNodeColor(current_tree_node.key+" "+depth);
        } else {
          current_list = arrayToList(current_tree_node.rilist);
          while (current_list != null && current_list.key >= query_key) {
            new_result = new ListNode();
            new_result.right = result_list;
            new_result.key = current_list.key;
            result_list = new_result;
            current_list = current_list.right;
          }
          current_tree_node = current_tree_node.right;
          depth+=1;
          changeNodeColor(current_tree_node.key+" "+depth);
        }
      }
      return result_list;
    }
  }
