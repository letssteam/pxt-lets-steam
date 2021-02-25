/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtblocks.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />


function deployAsync(resp: pxtc.CompileResult): Promise<void> {
    return pxt.commands.saveOnlyAsync(resp);
}

pxt.editor.initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
    pxt.debug('loading pxt-letssteam target extensions...')

    const res: pxt.editor.ExtensionResult = {
        "deployAsync": deployAsync
    };

    return Promise.resolve<pxt.editor.ExtensionResult>(res);
}