async function includeHTML(elementId,file) {
    const response = await fetch(file);
    const htmlContent = await response.text();
    document.getElementById(elementId).innerHTML = htmlContent;
}
// includeHTML('goldsmith','/pages/smith_pages.html');
// includeHTML('yann','/pages/yann_page.html');
includeHTML('ange','/pages/ange_page.html');
includeHTML('lelica','/pages/lelica_page.html');
includeHTML('maisy','/pages/maisy_page.html');
includeHTML('jessica','/pages/jessica_page.html');
includeHTML('jessica2','/pages/jessica_page2.html');
includeHTML('maisy2','/pages/maisy_page2.html');