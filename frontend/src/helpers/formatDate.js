const formatDate = (dateString,format) => {
   if (!dateString) return 'N/A'
   return new Date(dateString).toLocaleDateString('pt-PT', format) 
 }

export default formatDate
