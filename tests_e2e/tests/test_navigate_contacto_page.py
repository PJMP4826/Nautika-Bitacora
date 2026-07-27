from pages.contacto_page import ContactoPage

def test_successful_navigate_to_contact(driver, base_url):
    contacto_page = ContactoPage(driver, base_url)
    contacto_page.open()

    title = contacto_page.get_title_page()
    assert "Contáctanos" == title