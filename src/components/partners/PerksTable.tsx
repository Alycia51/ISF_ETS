import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';

export const PerksTable: React.FC = () => {
  const { t } = useI18n();
  const pkg = t.partners.packages;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="packages" id="forfaits" aria-labelledby="t-packages">
      <div className="container">
        <div className="packages-box">
          <div className="packages-head">
            <div>
              <h2 id="t-packages">{pkg.title}</h2>
              <p>{pkg.text}</p>
            </div>
            <button
              id="perksToggle"
              className="perks-toggle"
              type="button"
              aria-expanded={isOpen}
              aria-controls="perksTable"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? pkg.hide : pkg.show}
            </button>
          </div>

          <div className="packages-grid">
            {pkg.tiers.map((tier, i) => (
              <div key={i} className="package">
                <div className={`package-head package-head--${i}`}>
                  <div className="package-name">{tier.name}</div>
                  <div className="package-price">{tier.price}</div>
                </div>
                <ul className="package-perks">
                  {tier.perks.map((perk, j) => (
                    <li key={j}>{perk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div id="perksTable" className={`perks-table ${isOpen ? 'open' : ''}`}>
            <div className="perks-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">{pkg.header}</th>
                    {pkg.tiers.map((tier, i) => (
                      <th key={i} scope="col" className={`th--${i}`}>
                        {tier.name}
                        <small>{tier.price}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                {pkg.table.map((sec, si) => (
                  <tbody key={si}>
                    <tr className="perks-sec">
                      <th colSpan={5} scope="colgroup">
                        {sec.title}
                      </th>
                    </tr>
                    {sec.rows.map((row, ri) => (
                      <tr key={ri}>
                        <th scope="row">{row.label}</th>
                        {row.values.map((v, vi) => (
                          <td key={vi}>
                            {v === '●' ? (
                              <>
                                <span
                                  className={`perk-dot perk-dot--${vi}`}
                                  aria-hidden="true"
                                />
                                <span className="sr-only">{pkg.included}</span>
                              </>
                            ) : v === '—' ? (
                              <>
                                <span className="perk-none" aria-hidden="true">
                                  —
                                </span>
                                <span className="sr-only">{pkg.notIncluded}</span>
                              </>
                            ) : (
                              v
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

