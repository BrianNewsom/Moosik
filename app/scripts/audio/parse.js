function parse(parseHTML, TREE){
	var thisLevel = [];
	_.forEach(parseHTML, function(node){
		thisLevel.push(node);
	})

	if (TREE[0] = thisLevel){
	}
	_.forEach(parseHTML, function(node){
		if (!node.name) return;
		parseRec(node, 1, TREE);
	})
}

function parseRec(node, depth, TREE) {

	if (TREE) {
		if (typeof(TREE[depth]) === 'undefined'){
			TREE[depth] = [];
		}
		TREE[depth].push(node);
	}

	if (!node.children) return;
	_.forEach(node.children, function(child){
		if (!child.name) return;
		parseRec(child, depth+1, TREE);
	})
}
