async function includeHTML(elementId,file) {
    const response = await fetch(file);
    const htmlContent = await response.text();
    document.getElementById(elementId).innerHTML = htmlContent;
}

includeHTML('yann','/pages/yann_page.html');
includeHTML('lelica','/pages/lelica_page.html'); 