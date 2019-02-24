function testFn($)
{
	var toRet = [];
	toRet.push('<div id="123">From test Func</div>');
	toRet.push('<div id="1235">From test Func1</div>');
	toRet.push('<div id="1234">From test Func2</div>');
	toRet = toRet.join("");
	return toRet;
}

module.exports.testFn = testFn;