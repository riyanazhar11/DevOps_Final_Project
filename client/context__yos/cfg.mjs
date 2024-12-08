export const config = new Map([
  ["languages-on", true],  // // true or false if deactivated
  ["cktuserdata-on", true], // if false skip user data and address insertion
  ["cktaddress-on", true], // if false skip address data insertion
  ["cktshipping-on", true], // if false skip shipping type selection
  ["cktpayment-on", true], // if false skip payment type selection
  ["init-url-search", ""], // Value: ?menu=menu_id or ?category=cat_id&subcategory=subcat_id&item=item_id
  ["newordermailadmin-on", false], // mail to admin
  ["newordermailcustomer-on", false], // mail to customer
  ["currency-code", "USD"], // 'USD', 'EUR' ...
  ["currency-locale", null], // 'en-IN', 'en-US'  null => let for browser config
  // Esto de default-img en cliente es tonteria, mejor enviar un código al servidor que pueda reconocer y pasar esta configuracion de la imagen al servidor
  // ademas no guardar esta imagen con el resto si no aparte, parece que la mejor opcion es en loader/images
  // mejor que esto sea un codigo que el servidor reconozca
  ["default-img", "noimg.png"], // "noimg.png"
  ["item-imgs-max", 3], // Num maxim the images per item
  ["request-url-path", "request.cmd"], // url paths should have ".cmd" extension" to make it apart from client source files requests
  ["layouts-url-path", "layouts.cmd"], // layouts.cmd?skin=skinId&subskin=subskinId&style=styleId
  ["upload-imgs-url-path", "upload.cmd"],
  ["catalog-imgs-url-path", "catalogimages.cmd"],
  ["reports-url-path", "reports.cmd"],
])