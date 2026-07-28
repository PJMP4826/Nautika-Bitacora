from pages.home_page import HomePage
from pages.contacto_page import ContactoPage

def test_user_journey_navigate(driver, base_url):
    # 1. Iniciamos en la página principal
    home_page = HomePage(driver, base_url)
    home_page.open()

    # 2. Scroll vertical
    home_page.explore_page()

    