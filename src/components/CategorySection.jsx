import { useMemo, useState } from 'react'

/** Category form and list. Place and event relationships are enforced by the API. */
export default function CategorySection({
  categories, form, saving, loading, onFieldChange, onSubmit, onDelete,
}) {
  const [query, setQuery] = useState('')
  const visibleCategories = useMemo(() => categories.filter((item) => `${item.nombre} ${item.descripcion}`.toLowerCase().includes(query.trim().toLowerCase())), [categories, query])

  return (
    <section className="panel" aria-labelledby="categories-title">
      <div className="section-heading">
        <div><p className="eyebrow">ORGANIZACIÓN</p><h2 id="categories-title">Categorías</h2></div>
        <span className="counter" aria-label={`${categories.length} categorías`}>{categories.length}</span>
      </div>

      <form className="form-stack" onSubmit={onSubmit}>
        <label htmlFor="category-name">Nombre
          <input
            id="category-name"
            required
            maxLength="100"
            value={form.nombre}
            onChange={(event) => onFieldChange('nombre', event.target.value)}
            placeholder="Ej. Arquitectura religiosa"
          />
        </label>

        <label htmlFor="category-description">Descripción
          <textarea
            id="category-description"
            rows="3"
            value={form.descripcion}
            onChange={(event) => onFieldChange('descripcion', event.target.value)}
            placeholder="Describe esta categoría"
          />
        </label>

        <button className="button button-primary" disabled={saving}>
          {saving ? 'Guardando…' : 'Crear categoría'}
        </button>
      </form>

      <div className="list-block">
        <h3>Categorías registradas</h3>
        <label htmlFor="category-search">Buscar categoría<input id="category-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nombre o descripción" /></label>
        {categories.length === 0 && !loading && <p className="empty">Aún no hay categorías.</p>}
        <ul className="category-list">
          {visibleCategories.map((category) => (
            <li key={category.id} className="category-row">
              <div>
                <strong>{category.nombre}</strong>
                <p>{category.descripcion || 'Sin descripción'}</p>
              </div>
              <button
                type="button"
                className="button button-quiet"
                disabled={saving}
                onClick={() => onDelete(category)}
                aria-label={`Eliminar categoría ${category.nombre}`}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
