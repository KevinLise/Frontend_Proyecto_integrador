export function renderPlaceholder(nombre) {
  return `
    <div class="d-flex flex-column align-items-center justify-content-center bg-white
                rounded-3 border border-dashed text-center"
         style="min-height:260px;border-color:#cbd5e1!important;">
      <p class="text-secondary mb-1" style="font-size:.875rem;">Sección "${nombre}"</p>
      <p class="text-secondary mb-0" style="font-size:.75rem;color:#cbd5e1!important;">
        Diseño pendiente — se agrega cuando esté listo
      </p>
    </div>
  `;
}
