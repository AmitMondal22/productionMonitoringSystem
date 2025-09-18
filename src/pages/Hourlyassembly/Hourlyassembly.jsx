import React, { useState } from 'react';


const sampleData = [
  { sno: 1, from: '8:00AM', to: '9:00AM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: 9, line2day1: '', line3day1: '', line1day2: '', line2day2: '', line3day2: '', line1day3: 8 },
  { sno: 2, from: '9:00AM', to: '10:00AM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 71, line3day1: 28, line1day2: '', line2day2: '', line3day2: '', line1day3: 56 },
  { sno: 3, from: '10:00AM', to: '11:00AM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 47, line3day1: 22, line1day2: '', line2day2: '', line3day2: '', line1day3: 40 },
  { sno: 4, from: '11:00AM', to: '12:00AM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 86, line3day1: 62, line1day2: '', line2day2: '', line3day2: '', line1day3: 43 },
  { sno: 5, from: '12:00AM', to: '1:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 93, line3day1: 53, line1day2: '', line2day2: '', line3day2: '', line1day3: 80 },
  { sno: 6, from: '1:00PM', to: '2:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 34, line3day1: 40, line1day2: '', line2day2: '', line3day2: '', line1day3: 41 },
  { sno: 7, from: '2:00PM', to: '3:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 65, line3day1: 50, line1day2: '', line2day2: '', line3day2: '', line1day3: 8 },
  { sno: 8, from: '3:00PM', to: '4:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 40, line3day1: 9, line1day2: '', line2day2: '', line3day2: '', line1day3: 82 },
  { sno: 9, from: '4:00PM', to: '5:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 78, line3day1: 27, line1day2: 65, line2day2: '', line3day2: '', line1day3: 78 },
  { sno: 10, from: '5:00PM', to: '6:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 51, line3day1: 90, line1day2: 85, line2day2: '', line3day2: '', line1day3: 43 },
  { sno: 11, from: '6:00PM', to: '7:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 50, line3day1: 47, line1day2: 48, line2day2: '', line3day2: '', line1day3: 47 },
  { sno: 12, from: '7:00PM', to: '8:00PM', shift: 'DAY', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 88, line3day1: 79, line1day2: 26, line2day2: '', line3day2: '', line1day3: 83 },
  { sno: 13, from: '8:00PM', to: '9:00PM', shift: 'NIGHT', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 37, line3day1: 1, line1day2: 9, line2day2: '', line3day2: '', line1day3: 25 },
  { sno: 14, from: '9:00PM', to: '10:00PM', shift: 'NIGHT', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 50, line3day1: 55, line1day2: '', line2day2: '', line3day2: '', line1day3: 76 },
  { sno: 15, from: '10:00PM', to: '11:00PM', shift: 'NIGHT', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 40, line3day1: 34, line1day2: '', line2day2: '', line3day2: '', line1day3: '' },
  { sno: 16, from: '11:00PM', to: '12:00AM', shift: 'NIGHT', mtdtgt: '', mtdhourly: '', mtdavg: '', line1day1: '', line2day1: 64, line3day1: 37, line1day2: '', line2day2: '', line3day2: 70, line1day3: '' }
];

function Hourlyassembly() {
  const [selectedMonth, setSelectedMonth] = useState('MAY');
  const [selectedYear, setSelectedYear] = useState('2019');

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const years = ['2018', '2019', '2020', '2021', '2022'];

  const handleShow = () => {
    console.log('Show clicked with:', { selectedMonth, selectedYear });
  };

  const handleDownload = () => {
    console.log('Download clicked');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-700 mb-6">HOURLY ASSEMBLY</h2>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">MONTH</label>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-blue-500 min-w-24"
            >
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">YEAR</label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-blue-500 min-w-24"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
         <div className="flex gap-2 ml-auto mt-2">
  <button
    onClick={handleShow}
    className="bg-gradient-to-r from-blue-500 to-indigo-400 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
  >
    SHOW
  </button>
  <button
    onClick={handleDownload}
    className="bg-gradient-to-r from-blue-500 to-indigo-400 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
  >
    DOWNLOAD
  </button>
</div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">S.NO.</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">FROM</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">TO</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">SHIFT</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">MTD TGT</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">MTD HOURLY</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">MTD AVG</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">Line1/Day1</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">Line2/Day1</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">Line3/Day1</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">Line1/Day2</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">Line2/Day2</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">Line3/Day2</th>
                <th className="border border-gray-400 px-2 py-2 text-xs font-semibold text-gray-700 text-center">Line1/Day3</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row) => (
                <tr key={row.sno} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.sno}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.from}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.to}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.shift}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.mtdtgt}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.mtdhourly}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.mtdavg}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.line1day1}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.line2day1}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.line3day1}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.line1day2}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.line2day2}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.line3day2}</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs text-center">{row.line1day3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination or additional controls could go here */}
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing hourly assembly data for {selectedMonth} {selectedYear}
        </div>
      </div>
    </div>
  );
}

export default Hourlyassembly;