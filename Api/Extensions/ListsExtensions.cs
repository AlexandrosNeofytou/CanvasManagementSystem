namespace Api.Extensions
{
    public static class ListsExtensions 
    {
        public static bool HasElements<T>(this List<T> source,List<T> listToCheck)
        {
            bool hasElements=listToCheck.All(x=>source.Contains(x));

            return hasElements;
        }
    }
}