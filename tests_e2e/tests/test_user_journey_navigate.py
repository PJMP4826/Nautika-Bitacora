from pages.home_page import HomePage
from pages.zones_page import ZonePage
from pages.fish_page import FishPage
from pages.contacto_page import ContactoPage


def test_user_journey_navigate(driver, base_url):
    # 1. Iniciamos en la página principal
    home_page = HomePage(driver, base_url)
    zone_page = ZonePage(driver, base_url)
    fish_page = FishPage(driver, base_url)

    home_page.open()

    # 2. Scroll vertical
    home_page.scroll_smooth()

    home_page.go_to_zone()

    zone_page.scroll_smooth(pixels=600, delay=0.02)
    zone_page.click_random_zone(expected_url_part="/zones/")
    zone_page.scroll_smooth(pixels=600, delay=0.02)

    home_page.go_to_fish()
    
    fish_page.scroll_smooth(pixels=600, delay=0.02)
    fish_page.click_random_fish(expected_url_part="/fish/")
    fish_page.scroll_smooth(pixels=600, delay=0.02)
