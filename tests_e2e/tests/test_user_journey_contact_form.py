from pages.home_page import HomePage
from pages.contacto_page import ContactoPage

def test_user_journey_contact_form(driver, base_url):
    # 1. Iniciamos en la página principal
    home_page = HomePage(driver, base_url)
    home_page.open()

    # 2. Navegamos a Contacto
    home_page.go_to_contact()

    # 3. Llenamos y enviamos el formulario
    contacto_page = ContactoPage(driver, base_url)
    contacto_page.fill_and_submit_form(
        name="First-Name-Test",
        last_name="Last-Name-Test",
        email="prueba@ejemplo.com",
        phone_number="9945679765",
        message="Este es un mensaje automatizado simulando un flujo real."
    )

    # 4. ASERCIÓN: Verificar que aparezca el modal de éxito
    # Esto esperará automáticamente hasta 10 segundos a que el modal sea visible
    mensaje_exito = contacto_page.get_success_modal_text()
    
    assert "¡Mensaje enviado!" in mensaje_exito