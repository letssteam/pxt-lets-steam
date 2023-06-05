/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtblocks.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

//import * as dialogs from "./dialogs";
import * as flash from "./stm_dap_flash";
//import * as patch from "./patch";

pxt.editor.initExtensionsAsync = function (
  opts: pxt.editor.ExtensionOptions
): Promise<pxt.editor.ExtensionResult> {
  pxt.debug("loading STM target extensions...");
  console.log("loading STM target extensions...");

  let body = document.getElementsByTagName("body")[0];
  let container = document.createElement("div");
  let content = document.createElement("div");

  container.setAttribute("id", "upload_modal_container");
  container.style.backgroundColor = "rgba(20, 20, 20, 0.7)";
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.zIndex = "99999";
  container.style.display = "none";

  content.style.zIndex = "999999";
  content.style.width = "25vw";
  content.style.position = "relative";
  content.style.top = "50%";
  content.style.left = "50%";
  content.style.transform = "translate(-50%, -50%)";
  content.style.borderRadius = "5px";
  content.style.overflow = "hidden";
  content.innerHTML = `<div style="padding: 8px; background-color: #e9407f; color: #ffffff;">
            <h3>${lf("Uploading")}</h3>
        </div>
        <div style="padding: 16px; background-color: white;">
            <p>
                ${lf(
                  "Your program is uploading to your target, please wait."
                )}<br/><br/>
                <i>${lf(
                  "Do not unplug your board, do not close this tab nor change tab during uploading."
                )}</i><br/>
            </p>
            <div style="background-color: #cfcfcf; height: 20px; border-radius: 10px; overflow: hidden;">
                <p id="upload_modal_value" style="float: left; width: 100%; height: 100%; text-align: center">0%</p>
                <div id="upload_modal_bar" style="background-color: #3bbdd6; width: 0%; height: 100%;"></div>
            </div>
            <p id="upload_modal_message" style="display: none; padding-top: 8px;">
            </p>
            <div id="upload_modal_button" style="text-align: right; display: none;">
                <button onclick="document.getElementById('upload_modal_container').style.display = 'none'" style="border-radius: 10px; padding: 8px 32px; border: none; background: #e9407f; color: white; font-weight: bold; margin-top: 8px; cursor: pointer;">${lf(
                  "Ok"
                )}</button>
            </div>
        </div>`;

  container.appendChild(content);
  body.appendChild(container);

  const manyAny = Math as any;
  if (!manyAny.imul)
    manyAny.imul = function (a: number, b: number): number {
      const ah = (a >>> 16) & 0xffff;
      const al = a & 0xffff;
      const bh = (b >>> 16) & 0xffff;
      const bl = b & 0xffff;
      // the shift by 0 fixes the sign on the high part
      // the final |0 converts the unsigned value into a signed value
      return (al * bl + (((ah * bl + al * bh) << 16) >>> 0)) | 0;
    };

  const res: pxt.editor.ExtensionResult = {
    hexFileImporters: [],
  };

  res.deployAsync = async function (r: pxtc.CompileResult): Promise<void> {
    var wrapper = (await pxt.packetio.initAsync()) as flash.STMDAPWrapper;

    if (!r.success) {
      return Promise.reject();
    }

    if (wrapper.isTargetReady() && !r.saveOnly) {
      wrapper.onFlashFinish = (error) => {
        wrapper.onFlashProgress = null;
        wrapper.onFlashFinish = null;

        if (error == null) {
          document.getElementById(
            "upload_modal_message"
          ).innerHTML = `<span style="color: #22AA22">Upload complete !</span>`;
        } else if (error instanceof Error) {
          document.getElementById(
            "upload_modal_message"
          ).innerHTML = `<span style="color: #FF5500">Upload failed !</span><br>Reason: [${error.name}] ${error.message}<br/><br/>Try unplugging your card and then plugging it back in.`;
        } else {
          document.getElementById(
            "upload_modal_message"
          ).innerHTML = `<span style="color: #FF5500">Upload failed !</span><br>Reason: ${error}<br/><br/>Try unplugging your card and then plugging it back in.`;
        }

        document.getElementById("upload_modal_button").style.display = "block";
        document.getElementById("upload_modal_message").style.display = "block";
      };

      wrapper.onFlashProgress = (prg) => {
        let bar = document.getElementById("upload_modal_bar");
        let text = document.getElementById("upload_modal_value");

        text.innerText = Math.round(prg * 100) + "%";
        bar.style.width = `${prg * 100}%`;
      };

      document.getElementById("upload_modal_container").style.display = "block";
      document.getElementById("upload_modal_message").style.display = "none";
      document.getElementById("upload_modal_message").innerText = "";
      document.getElementById("upload_modal_button").style.display = "none";
      wrapper.onFlashProgress(0);

      return wrapper.reflashAsync(r).catch(() => {
        console.error("Failed to upload...");
        return pxt.commands.saveOnlyAsync(r);
      });
    } else {
      console.log("Target not ready or save only !");
      return pxt.commands.saveOnlyAsync(r);
    }
  };

  pxt.usb.setFilters([
    {
      vendorId: 0x0d28,
      productId: 0x0204,
      classCode: 0xff,
      subclassCode: 0x03, // the ctrl pipe endpoint
    },
    {
      vendorId: 0x0d28,
      productId: 0x0204,
      classCode: 0xff,
      subclassCode: 0x00, // the custom CMSIS2 endpoint
    },
  ]);

  res.mkPacketIOWrapper = flash.mkSTMDAPPacketIOWrapper;
  // res.blocklyPatch = patch.patchBlocks;
  // res.renderBrowserDownloadInstructions = dialogs.renderBrowserDownloadInstructions;
  // res.renderUsbPairDialog = dialogs.renderUsbPairDialog;
  return Promise.resolve<pxt.editor.ExtensionResult>(res);
};
