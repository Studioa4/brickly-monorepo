export default function TestTabella() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">TEST TABELLA</h1>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Colonna 1</th>
              <th className="p-2">Colonna 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-center text-gray-500" colSpan={2}>
                Nessun dato disponibile
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  