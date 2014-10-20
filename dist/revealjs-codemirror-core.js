/*! revealjs-codemirror-core - v0.0.0 - 2014-10-20
* Copyright (c) 2014 ; Licensed MIT */
window.revealjscodemirror = (function(){
  return {
    version: '0.0.0'
  };
})();
(function(document, CodeMirror, Q, revealjscodemirror){
    'use strict';

    function hasCodeClass(domNode){
        if (domNode){
            return domNode.classList.contains('code');
        }
        return false;
    }

    function createRunHandler(textarea, options){
        var runHandler = function(){
            var deferred = Q.defer();
            deferred.resolve(textarea.value);
            return deferred.promise();
        };
        if (options && options.runHandler) {
            runHandler = function(){
                return options.runHandler(textarea.value);
            };
        }
        return runHandler;
    }

    function createCodeMirror(textarea, options){
        var editor = CodeMirror.fromTextArea(textarea, options);
        if (textarea.dataset && textarea.dataset.runnable) {
			[
				{ element: 'div', class: 'run', innerText: 'Run', handler: createRunHandler(textarea, options) },
				{ element: 'div', class: 'clear', innerText: 'Clear', handler: function(){
                    var log = this.getWrapperElement().getElementsByClassName('log')[0];
                    log.innerText = '';
                } },
				{ element: 'div', class: 'log' },
			].forEach(function(description){
				var element = document.createElement(description.element);
				element.classList.add(description.class);
				if (description.innerText) {
					element.innerText = description.innerText;
				}
                if (description.handler) {
                    element.onclick = description.handler.bind(editor);
                }
				editor.getWrapperElement().appendChild(element);
			});
        }
    }

    revealjscodemirror.codemirrorify = function(options){
        Array.prototype.slice.call(document.querySelectorAll('textarea'))
            .filter(hasCodeClass)
            .forEach(function(textarea){
				createCodeMirror(textarea, options);
			});
    };
})(document, CodeMirror, Q, revealjscodemirror);
