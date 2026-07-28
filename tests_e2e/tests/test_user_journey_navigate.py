from pages.home_page import HomePage
from pages.zones_page import ZonePage
from pages.fish_page import FishPage


def test_user_journey_navigate(driver, base_url):
    print("\nIniciando navegacion del usuario")

    home_page = HomePage(driver, base_url)
    zone_page = ZonePage(driver, base_url)
    fish_page = FishPage(driver, base_url)

    print(f"Abriendo pagina principal: {base_url}")
    home_page.open()

    print("Realizando scroll en Home...")
    home_page.scroll_smooth(pixels=3000)

    print("Navegando a Zonas...")
    home_page.go_to_zone()

    print("Interactuando con seccion de Zonas...")
    zone_page.scroll_smooth(pixels=600, delay=0.2)
    zone_page.click_random_zone(expected_url_part="/zones/")
    zone_page.scroll_smooth(pixels=600, delay=0.2)

    print("Navegando a Peces...")
    home_page.go_to_fish()

    print("Interactuando con seccion de Peces...")
    fish_page.scroll_smooth(pixels=600, delay=0.2)
    fish_page.click_random_fish(expected_url_part="/fish/")
    fish_page.scroll_smooth(pixels=600, delay=0.2)

    print("Viaje del usuario completado")
