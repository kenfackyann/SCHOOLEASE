async function includeHTML(elementId,file) {
    const response = await fetch(file);
    const htmlContent = await response.text();
    document.getElementById(elementId).innerHTML = htmlContent;
}

includeHTML('yann','/pages/yann_page.html');
includeHTML('ange','/pages/ange_page.html');
includeHTML('lelica','/pages/lelica_page.html');
includeHTML('goldsmith','/pages/smith_pages.html');
includeHTML('jeanClaude','/pages/smith_pages.html');
includeHTML('maisy','/pages/smith_pages.html');
includeHTML('tessoh','/pages/smith_pages.html');